#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Haptics, NSObject)
RCT_EXTERN_METHOD(play : (NSString *)kind)
@end
