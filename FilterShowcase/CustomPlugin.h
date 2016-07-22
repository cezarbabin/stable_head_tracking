

#import <Cordova/CDVPlugin.h>
#import "FilterViewController.h"

@interface CustomPlugin : CDVPlugin <FilterViewControllerDelegate>
- (void)start:(CDVInvokedUrlCommand*)command;
-(void)onTick:(NSTimer *)timer;
@end
