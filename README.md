# time-series-factory cli #

![Sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=dlorian_ts-factory-cli&metric=alert_status)

_time-series-factory_ (_ts-factory_ or _tsf_) let you create times series mock data with your CLI.

## Requirements ##

Make sure you have installed node with npm on you machine;

## How to install ##

Run the following command within your terminal

```npm install -g @dlorian/ts-factory-cli```

## How to run ##

You can run ts-factory-cli either with [Commander](https://www.npmjs.com/package/commander) or [Inquirer](https://www.npmjs.com/package/inquirer).

Choose the one you prefer or which is better supported by your terminal. There might be some issues with Inquirer. See [here](https://www.npmjs.com/package/inquirer#support) for supproted terminals.

### Use it with Commander ###

 To run it with Commander type the following

 `tsf -s 2019-01-01 -e 2020-01-01 -f json -g 15min`

 This will create a time series for the year 2019 with a quarter hour granualrity written as json.


### Use it with Inquirer ###

 To run it with Inquirer type the following

 `tsfi`

After that, you will ask some questions for time series creation.