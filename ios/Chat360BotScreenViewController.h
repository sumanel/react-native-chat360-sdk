//
//  Chat360BotScreenViewController.h
//  react-native-chat360-sdk
//
//  Created by Harshit Sharma on 21/12/24.
//

#import <UIKit/UIKit.h>
#import "Chat360Config.h"
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Chat360BotScreenViewController : UIViewController

@property (nonatomic, strong) WKWebView *webView;
@property (nonatomic, strong) UIButton *backButton;

- (instancetype)initWithBotConfig:(Chat360Config *)botConfig;

@end

NS_ASSUME_NONNULL_END
