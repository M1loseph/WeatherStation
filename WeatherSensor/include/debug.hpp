#ifndef __WEATHER_DEBUG_HPP__
#define __WEATHER_DEBUG_HPP__

#if WEATHER_DEBUG

#define INIT_DEBUG Serial.begin(config::monitor_speed);
#define LOG(var) Serial.print(var);
#define LOG_NL(var) Serial.println(var);
#define LOG_F(...) Serial.printf(__VA_ARGS__);
#define SERIALIZE(json) serializeJsonPretty(json, Serial);

#else

#define INIT_DEBUG
#define LOG(var)
#define LOG_NL(var)
#define LOG_F(...)
#define SERIALIZE(json)

#endif // WEATHER_DEBUG

#endif // __WEATHER_DEBUG_HPP__
