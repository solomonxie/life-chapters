#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Files, NSObject)
RCT_EXTERN_METHOD(writeTemp : (NSString *)name text : (NSString *)text resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(readText : (NSString *)path resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(share : (NSString *)path resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(pickFile : (NSArray *)kinds resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(addScan : (NSString *)source resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(scanPath : (NSString *)name resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(deleteScan : (NSString *)name resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(openFolder : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)
@end
