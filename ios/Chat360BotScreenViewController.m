//
//  Chat360BotScreenViewController.m
//  react-native-chat360-sdk
//
//  Created by Harshit Sharma on 21/12/24.
//

#import "Chat360BotScreenViewController.h"

@interface Chat360BotScreenViewController () <WKNavigationDelegate>

@property (nonatomic, strong) Chat360Config *botConfig;


@end

@implementation Chat360BotScreenViewController

- (instancetype)initWithBotConfig:(Chat360Config *)botConfig {
    self = [super init];
    if (self) {
        _botConfig = botConfig;
        self.modalPresentationStyle = UIModalPresentationFullScreen;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    [self setupBackButton];
    [self setupWebView];
    NSURL *url = [self.botConfig createUrl];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
}


- (void)setupBackButton {
    self.backButton = [UIButton buttonWithType:UIButtonTypeSystem];
    self.backButton.frame = CGRectMake(10, 40, 100, 40); // Positioned at the top left
    [self.backButton setTitle:@"Back" forState:UIControlStateNormal];
    [self.backButton addTarget:self action:@selector(backButtonTapped) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.backButton];
}

- (void)setupWebView {
    WKWebViewConfiguration *webViewConfig = [[WKWebViewConfiguration alloc] init];
    CGRect webViewFrame = CGRectMake(0, 80, self.view.frame.size.width, self.view.frame.size.height - 80);
    self.webView = [[WKWebView alloc] initWithFrame:webViewFrame configuration:webViewConfig];
    self.webView.navigationDelegate = self;
    self.webView.translatesAutoresizingMaskIntoConstraints = false;
    self.webView.scrollView.scrollEnabled = YES;
    [self.view addSubview:self.webView];
}

- (void)backButtonTapped {
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end
