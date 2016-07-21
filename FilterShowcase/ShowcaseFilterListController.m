#import "ShowcaseFilterListController.h"
#import "ShowcaseFilterViewController.h"

@interface ShowcaseFilterListController ()

@end

@implementation ShowcaseFilterListController

- (id)initWithStyle:(UITableViewStyle)style
{
    //self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    //[super viewDidLoad];
    //self.title = @"Filter List";
}

- (void)viewDidUnload
{
    //[super viewDidUnload];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

#pragma mark - Table view data source
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Disable the last filter (Core Image face detection) if running on iOS 4.0
    if ([GPUImageContext supportsFastTextureUpload])
    {
        return GPUIMAGE_NUMFILTERS;
    }
    else
    {
        return (GPUIMAGE_NUMFILTERS - 1);
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
	NSInteger index = [indexPath row];
    NSLog(@"%@", indexPath);
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"FilterCell"];
	if (cell == nil) 
	{
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"FilterCell"];
		cell.textLabel.textColor = [UIColor blackColor];
	}		
	
	cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    
	switch (index)
	{
        case GPUIMAGE_FACES: cell.textLabel.text = @"Face Detection"; break;
	}
    
    return cell;
}


/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    ShowcaseFilterViewController *filterViewController = [[ShowcaseFilterViewController alloc] initWithFilterType:GPUIMAGE_FACES];
    //[self.navigationController pushViewController:filterViewController animated:YES];
}

@end
