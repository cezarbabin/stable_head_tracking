#import "CustomPlugin.h"

@implementation CustomPlugin

- (void)start:(CDVInvokedUrlCommand*)command {
    
    //NSArray *arguments = command.arguments;
    //NSDictionary *options = [arguments objectAtIndex:0];
    
    NSString* callbackID = command.callbackId;
    NSLog(@"start invoked");
    
    
    //Make very similar but abstractable interface for ACC
    //[NSTimer scheduledTimerWithTimeInterval:2.0
    //                                 target:self
    //                               selector:@selector(onTick:)
    //                               userInfo:nil
    //                                repeats:YES];
    
    FilterViewController* vc = (FilterViewController *)self.viewController.parentViewController;
    vc.delegate = self;
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"OK"];
    [self writeJavascript: [pluginResult toSuccessCallbackString:callbackID]];
}

-(void)onTick:(NSTimer *)timer {
    
    NSLog(@"timer tick!");
    
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"dd-MM-yyyy HH:mm:ss.SSS"];
    
    NSString *dateString = [formatter stringFromDate:[NSDate date]];
    NSString *js = [NSString stringWithFormat:@"updateContent( '%@' );", dateString];
    
    [self writeJavascript:js];
    
}

-(void)say:(NSString *)it {
    NSLog(it);
    NSString *js = [NSString stringWithFormat:@"setHead( '%@' );", it];
    [self writeJavascript:js];
}

@end
