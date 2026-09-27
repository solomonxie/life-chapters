#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarMirror, NSObject)
RCT_EXTERN_METHOD(sync : (NSArray *)events resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(remove : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
@end
