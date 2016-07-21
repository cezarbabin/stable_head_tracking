#import <UIKit/UIKit.h>
#import "FilterViewController.h"

//@class FilterViewController;

@interface ShowcaseAppDelegate : UIResponder <UIApplicationDelegate>
{
    UINavigationController *filterNavigationController;

    FilterViewController *filterViewController;
}

@property (strong, nonatomic) UIWindow *window;

@end
