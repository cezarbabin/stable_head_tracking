#import "CustomPlugin.h"

@implementation CustomPlugin

- (void)start:(CDVInvokedUrlCommand*)command {
    
    //NSArray *arguments = command.arguments;
    //NSDictionary *options = [arguments objectAtIndex:0];
    
    NSString* callbackID = command.callbackId;
    NSLog(@"start invoked");
    
    
    //Make very similar but abstractable interface for ACC
    [NSTimer scheduledTimerWithTimeInterval:0.001
                                     target:self
                                   selector:@selector(onTick:)
                                   userInfo:nil
                                    repeats:YES];
    
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

@end
