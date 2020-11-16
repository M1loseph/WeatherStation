#ifndef __PROGRAM_CONFIG_HPP__
#define __PROGRAM_CONFIG_HPP__

#include <Arduino.h>

#if (defined(ESP32) && defined(ESP8266)) || (!defined(ESP32) && !defined(ESP8266))
#error Wrong build flags!
#endif

#ifdef ESP8266
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#elif defined(ESP32)
#include <Wifi.h>
#include <HTTPClient.h>
#endif

namespace config
{
#ifdef LOW_POWER
    constexpr uint64_t sleep_time = 30e6 * 10U;
    constexpr uint64_t sleep_time_on_error = 10e7 * 10U;
#else
    constexpr uint64_t sleep_time = 30e6;
    constexpr uint64_t sleep_time_on_error = 10e7;
#endif

    constexpr uint32_t signalise_threshold = 20U;
    constexpr const char *room_name = "seba";
    constexpr unsigned long monitor_speed = 115200;

#ifdef ESP8266
    constexpr uint8_t diode_pin = D5;
#elif defined(ESP32)
    constexpr uint8_t diode_pin = 33;
#endif
} // namespace config

#endif // __PROGRAM_CONFIG_HPP__