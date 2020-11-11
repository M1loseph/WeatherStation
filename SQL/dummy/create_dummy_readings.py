from scipy.stats import uniform
from scipy.stats import norm
from scipy.stats import expon
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from datetime import date, timedelta
import argparse

min_temp = 10
max_temp = 30

min_pressure = 900
max_pressure = 1100

min_humidity = 20
max_humidity = 100

length = 100
show_plt = False

# room_one - linear distribution
# room_two - normal distribution
# room_three - exponential discribution
# room_four - const readings


def const(size, loc, scale):
    return [loc + scale / 2 for i in range(0, size)]


rooms = [
    ('room_one', uniform.rvs),
    ('room_two', norm.rvs),
    ('room_three', expon.rvs),
    ('room_four', const)
]


def generate_data(genrator):
    return (
        generator(size=length, loc=min_temp, scale=max_temp - min_temp),
        generator(size=length, loc=min_humidity,
                  scale=max_humidity - min_humidity),
        generator(size=length, loc=min_pressure,
                  scale=max_pressure - min_pressure)
    )


today = date.today()
dates = pd.date_range(today - timedelta(days=length-1), today, freq='d')
data = []


for (_, generator) in rooms:
    data.append(generate_data(generator))

for i in range(0, len(rooms)):
    for j in range(0, length):
        print(
            f"('{rooms[i][0]}', {data[i][0][j]}, {data[i][1][j]}, {data[i][2][j]}, '{dates[j].strftime('%Y-%m-%d %H:%M:%S')}')")

    if show_plt:
        fig, ax = plt.subplots(nrows=3, ncols=1, figsize=(15, 6))
        for j in range(0, 3):
            ax[j].plot(dates, data[i][j])
        plt.show()
