//
//  Chat360Bot.m
//  react-native-chat360-sdk
//
//  Created by Harshit Sharma on 21/12/24.
//

#import "Chat360Bot.h"
#import "Chat360Config.h"

@implementation Chat360Bot

// Initialize the bot view (returns a ChatController instance or throws an error)
- (Chat360BotScreenViewController *)initializesBotViewWithError:(NSError **)error config:(Chat360Config *)chat360Config {
    if (!chat360Config) {
        if (error) {
            NSString *errorMessage = @"Config not found. Please use setConfig(config) to set the configuration before calling this function.";
            NSDictionary *userInfo = @{ NSLocalizedDescriptionKey : errorMessage };
            *error = [NSError errorWithDomain:@"com.chat360bot" code:1001 userInfo:userInfo];
        }
        return nil;
    }

    Chat360BotScreenViewController *botController = [[Chat360BotScreenViewController alloc] initWithBotConfig:chat360Config];
    return botController;
}

// Start the chatbot
- (void)startChatbotWithAnimated:(BOOL)animated config:(Chat360Config *) chat360Config completion:(void (^)(void))completion error:(NSError **)error {
    UIViewController *rootViewController = [UIApplication sharedApplication].windows.firstObject.rootViewController;
    if (!rootViewController) {
        if (error) {
            NSString *errorMessage = @"View controller not found. Please use startChatbotOnViewController: and pass a view controller as the first parameter.";
            NSDictionary *userInfo = @{ NSLocalizedDescriptionKey : errorMessage };
            *error = [NSError errorWithDomain:@"com.chat360bot" code:1002 userInfo:userInfo];
        }
        return;
    }
    [self startChatbotOnViewController:rootViewController config:chat360Config animated:animated completion:completion error:error];
}

// Start the chatbot on a specific view controller
- (void)startChatbotOnViewController:(UIViewController *)viewController config:(Chat360Config *) chat360Config animated:(BOOL)animated completion:(void (^)(void))completion error:(NSError **)error {
    // Initialize the bot view
    Chat360BotScreenViewController *controller = [self initializesBotViewWithError:error config:chat360Config ];
    if (*error) {
        return;
    }
    RCTLogInfo(@"Pushed the screen on the app");
    [viewController presentViewController:controller  animated:animated completion:completion];
}

@end
