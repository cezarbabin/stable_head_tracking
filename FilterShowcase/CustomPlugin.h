

#import <Cordova/CDVPlugin.h>
#import "FilterViewController.h"

@interface CustomPlugin : CDVPlugin <FilterViewControllerDelegate>
-(void)start:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)onTick:(NSTimer *)timer;
@end
