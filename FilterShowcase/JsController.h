//
//  JsController.h
//  HeadTracker
//
//  Created by Cezar Babin on 7/21/16.
//  Copyright © 2016 Cell Phone. All rights reserved.
//

#import <Cordova/CDVViewController.h>
#import <Cordova/CDVCommandDelegateImpl.h>
#import <Cordova/CDVCommandQueue.h>

@interface JsController : CDVViewController

@end

@interface CommandDelegate : CDVCommandDelegateImpl
@end

@interface CommandQueue : CDVCommandQueue
@end
