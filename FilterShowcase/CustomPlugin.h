

#import <Cordova/CDVPlugin.h>

@interface CustomPlugin : CDVPlugin
-(void)start:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)onTick:(NSTimer *)timer;
@end
