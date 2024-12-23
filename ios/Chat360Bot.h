//
//  Chat360Bot.h
//  react-native-chat360-sdk
//
//  Created by Harshit Sharma on 21/12/24.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Chat360BotScreenViewController.h"
#import <React/RCTLog.h>

NS_ASSUME_NONNULL_BEGIN

@interface Chat360Bot : NSObject

// Bot Methods
- (Chat360BotScreenViewController *)initializesBotViewWithError:(NSError **)error config:(Chat360Config *) chat360Config;
- (void)startChatbotWithAnimated:(BOOL)animated config:(Chat360Config *) chat360Config completion:(void (^)(void))completion error:(NSError **)error;
- (void)startChatbotOnViewController:(UIViewController *)viewController config:(Chat360Config *) chat360Config animated:(BOOL)animated completion:(void (^)(void))completion error:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
