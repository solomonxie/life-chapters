.PHONY: help check ios sim release screenshots device-shots

.DEFAULT_GOAL := help

# App Store region the build targets: us (Canada/US, default) or cn. Info.plist AppStoreRegion.
STORE ?= us
XC_STORE = --extra-params APP_STORE_REGION=$(STORE)

help:
	@echo "make ios            Release build onto the paired iPhone"
	@echo "make sim            Release build onto a simulator"
	@echo "make release        check, then archive + upload to App Store Connect"
	@echo "make release BUILD=202609241830   same, with the build number pinned"
	@echo "  STORE=cn on ios/sim/release builds for the China App Store (default us: Canada/US)"
	@echo "make check          typecheck, lint, tests"
	@echo "make device-shots   capture listing shots from the iPhone (sample data)"
	@echo "make screenshots    SHOTS=<dir>  resize to the App Store slots"

check:
	npm run check

ios:
	npm run ios -- --mode Release $(XC_STORE)

sim:
	npx react-native run-ios --mode Release $(XC_STORE)

# Archive, sign for the App Store and upload — no Xcode Organizer.
# Needs ios/Local.xcconfig and the app record already created in App Store
# Connect. Uploads whatever is on disk, so say so when that is not a commit.
release: check
	@git diff --quiet HEAD -- || echo "warning: uncommitted changes are going into this build"
	STORE=$(STORE) scripts/release-ios.sh $(BUILD)

device-shots:
	scripts/device-shots.sh $(SHOTS)

screenshots:
	scripts/store-screenshots.sh $(SHOTS)
