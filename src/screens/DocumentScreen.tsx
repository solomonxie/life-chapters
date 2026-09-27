import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { formatDate } from '../domain/format';
import { documentViews } from '../domain/plan';
import type { CivilDate, DocumentRecord } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { files } from '../platform';
import { actions, useStore } from '../state/store';
import {
  Button,
  Card,
  DateWheel,
  ListRow,
  Rows,
  SectionHeader,
  StepRow,
  space,
  type,
  usePalette,
} from '../ui';

type Open = 'issued' | 'expires' | null;

export function DocumentScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Document'>) {
  const p = usePalette();
  const { documentId } = route.params;
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const moves = useStore(s => s.moves);
  const now = useStore(s => s.now);
  const doc = useMemo(
    () => documentViews(plan.documents, view, plan.instances).find(d => d.id === documentId),
    [plan.documents, plan.instances, view, documentId],
  );
  const [open, setOpen] = useState<Open>(null);
  const [reveal, setReveal] = useState(false);
  const [scanUri, setScanUri] = useState<string | null>(null);
  const [viewer, setViewer] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    if (!focused) setReveal(false);
  }, [focused]);

  const scan = doc?.record?.scanPath;
  useEffect(() => {
    if (!scan) return setScanUri(null);
    files.scanPath(scan).then(path => setScanUri(path ? `file://${path}` : null));
  }, [scan]);

  const record: DocumentRecord = doc?.record ?? { id: documentId, name: doc?.name ?? documentId };
  const save = (patch: Partial<DocumentRecord>) => actions.saveDocument({ ...record, ...patch });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: doc?.name ?? '',
      headerRight: () => (
        <Pressable onPress={menu} hitSlop={12} accessibilityRole="button" accessibilityLabel="More">
          <Text style={[type.headline, { color: p.accent }]}>⋯</Text>
        </Pressable>
      ),
    });
  });

  if (!doc) {
    return (
      <View style={[styles.gone, { backgroundColor: p.bg }]}>
        <Text style={[type.body, { color: p.dim }]}>No step asks for this document any more.</Text>
      </View>
    );
  }

  const addScan = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      { options: ['Take photo', 'Photo library', 'Files', 'Cancel'], cancelButtonIndex: 3 },
      async i => {
        const source = (['camera', 'photos', 'files'] as const)[i];
        if (!source) return;
        const name = await files.addScan(source);
        if (!name) return;
        if (record.scanPath) files.deleteScan(record.scanPath);
        save({ scanPath: name, issuedOn: record.issuedOn ?? now });
      },
    );

  function menu() {
    const opts = [...(scanUri ? ['Share…'] : []), scanUri ? 'Replace scan' : 'Add a scan', 'Forget this document', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions(
      { options: opts, cancelButtonIndex: opts.length - 1, destructiveButtonIndex: opts.length - 2 },
      i => {
        const o = opts[i];
        if (o === 'Share…' && scanUri) files.share(scanUri.replace('file://', ''));
        if (o === 'Replace scan' || o === 'Add a scan') addScan();
        if (o === 'Forget this document') forget();
      },
    );
  }

  const forget = () =>
    Alert.alert(`Forget "${doc.name}"?`, 'Its dates, number and scan are removed. Steps still list it.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Forget',
        style: 'destructive',
        onPress: () => {
          if (record.scanPath) files.deleteScan(record.scanPath);
          actions.forgetDocument(doc.id);
          navigation.goBack();
        },
      },
    ]);

  const editNumber = () =>
    Alert.prompt(
      'Document number',
      'Kept on this device only.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: (v?: string) => save({ number: v?.trim() || undefined }) },
      ],
      'plain-text',
      record.number ?? '',
    );

  const expired = doc.expiresOn && doc.expiresOn < now;
  const planRedo = () => {
    const c = doc.clash;
    const source = c?.source ?? doc.askedBy.find(s => s.status === 'done');
    const consumer = c?.consumer ?? doc.neededBy;
    if (!source || !consumer || source.trackId !== consumer.trackId) {
      Alert.alert('Nothing to redo', 'No step in your plan produces this document.');
      return;
    }
    const id = actions.planRedo(source.trackId, source.stepId, consumer.stepId);
    if (id) navigation.navigate('Step', { instanceId: id });
  };

  const dateRow = (key: Open, label: string, value: CivilDate | undefined, empty: string) => (
    <>
      <ListRow
        label={label}
        value={value ? formatDate(value) : empty}
        open={open === key}
        onPress={() => setOpen(o => (o === key ? null : key))}
      />
      {open === key ? (
        <>
          <DateWheel
            value={value ?? now}
            onChange={d => save(key === 'issued' ? { issuedOn: d } : { expiresOn: d, noExpiry: undefined })}
            minYear={Number(now.slice(0, 4)) - 40}
            maxYear={Number(now.slice(0, 4)) + 20}
          />
          {key === 'expires' ? (
            <View style={styles.switchRow}>
              <Text style={[type.body, styles.flex, { color: p.text }]}>Doesn't expire</Text>
              <Switch
                value={!!record.noExpiry}
                onValueChange={none =>
                  save({ noExpiry: none || undefined, expiresOn: none ? undefined : doc.expiresOn ?? now })
                }
              />
            </View>
          ) : null}
        </>
      ) : null}
    </>
  );

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Card style={styles.scanCard}>
        {scanUri ? (
          <Pressable onPress={() => setViewer(true)} accessibilityRole="imagebutton" accessibilityLabel="View scan">
            <Image source={{ uri: scanUri }} style={styles.thumb} resizeMode="cover" />
          </Pressable>
        ) : (
          <Button title="+ Add a scan or photo" kind="plain" onPress={addScan} style={styles.addScan} />
        )}
      </Card>

      {expired ? (
        <Card style={[styles.alert, { backgroundColor: p.lateSoft }]}>
          <Text style={[type.body, { color: p.text }]}>⚠ Expired {formatDate(doc.expiresOn!)}</Text>
          <Button title="Plan a redo" kind="primary" onPress={planRedo} />
        </Card>
      ) : doc.clash ? (
        <Card style={[styles.alert, { backgroundColor: p.lateSoft }]}>
          <Pressable
            onPress={() => navigation.navigate('Step', { instanceId: doc.clash!.consumer.instanceId })}
            accessibilityRole="button">
            <Text style={[type.body, { color: p.text }]}>
              ⚠ Expires {doc.clash.gapDays} days before "{doc.clash.consumer.title}" needs it. ›
            </Text>
          </Pressable>
          <Button title="Plan a redo" onPress={planRedo} />
        </Card>
      ) : null}

      <Card style={styles.card}>
        <Rows>
          {dateRow('issued', 'issued', record.issuedOn ?? doc.issuedOn, 'not yet')}
          {dateRow('expires', 'expires', record.expiresOn ?? doc.expiresOn, "doesn't expire")}
          <ListRow
            label="number"
            value={record.number ? (reveal ? record.number : '••••••••') : 'add'}
            onPress={editNumber}
            right={
              record.number ? (
                <Pressable
                  onPress={() => setReveal(r => !r)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={reveal ? 'Hide number' : 'Show number'}>
                  <Text style={type.body}>{reveal ? '🙈' : '👁'}</Text>
                </Pressable>
              ) : undefined
            }
          />
          <ListRow label="kept in" value="Files › Life Chapters" onPress={() => files.openFolder()} />
        </Rows>
      </Card>

      {doc.askedBy.length ? (
        <>
          <SectionHeader title="Asked for by" />
          <Card>
            <Rows inset={space.lg + 18 + space.sm}>
              {doc.askedBy.map(s => (
                <StepRow
                  key={s.instanceId}
                  step={s}
                  now={now}
                  move={moves[s.instanceId]}
                  subtitle={s.playbook.title}
                  onPress={() => navigation.navigate('Step', { instanceId: s.instanceId })}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      <Modal visible={viewer} animationType="fade" onRequestClose={() => setViewer(false)}>
        <Pressable style={styles.viewer} onPress={() => setViewer(false)} accessibilityLabel="Close scan">
          {scanUri ? <Image source={{ uri: scanUri }} style={styles.full} resizeMode="contain" /> : null}
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  flex: { flex: 1 },
  gone: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl },
  scanCard: { marginTop: space.sm },
  thumb: { width: '100%', height: 180 },
  addScan: { paddingVertical: space.xl, alignSelf: 'center' },
  alert: { padding: space.lg, gap: space.md, marginTop: space.md },
  card: { marginTop: space.md },
  switchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: space.lg, paddingBottom: space.md },
  viewer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  full: { width: '100%', height: '100%' },
});
