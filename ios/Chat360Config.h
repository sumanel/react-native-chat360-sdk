//
//  Chat360Config.h
//  react-native-chat360-sdk
//
//  Created by Harshit Sharma on 21/12/24.
//
#import <Foundation/Foundation.h>
#import <React/RCTLog.h>

NS_ASSUME_NONNULL_BEGIN

@interface Chat360Config : NSObject

@property (nonatomic, copy) NSString *baseUrl;
@property (nonatomic, copy) NSString *botId;
@property (nonatomic, copy) NSString *appId;
@property (nonatomic, assign) BOOL isDebug;
@property (nonatomic, assign) BOOL flutter;
@property (nonatomic, strong, nullable) NSDictionary<NSString *, NSString *> *meta;

- (instancetype)initWithBotId:(NSString *)botId
                       appId:(NSString *)appId
                      isDebug:(BOOL)isDebug
                       flutter:(BOOL)flutter
                         meta:(nullable NSDictionary<NSString *, NSString *> *)meta;

- (nullable NSURL *)createUrl;

@end

NS_ASSUME_NONNULL_END
