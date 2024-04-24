# Vizing Points

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

## Record points

> Before integrating the Vizing points system, DApp developers need to provide Vizing with the miner, point name, and point symbol to apply for the use of the points system (currently, you can submit an issue in this repository to apply). Once Vizing receives the application, they will assign a points contract to the DApp. Miners can then record user points through the following two methods.

### Recording a single points

> Invoking the `mint` method of the VPoints contract.

- Params

| Field  | Type    | Remark                      |
| ------ | ------- | --------------------------- |
| to     | address | User address                |
| amount | uint256 | Points value. Unit: wei     |
| data   | string  | Remark info. Ex: Cross 5 TX |

### Recording batch points

> Invoking the `mintBatch` method of the VPoints contract.

- Params

| Field   | Type      | Remark             |
| ------- | --------- | ------------------ |
| tos     | address[] | Batch user address |
| amounts | uint256[] | Batch points value |
| datas   | string[]  | Batch remark info  |

## Query points API

### Points information

`GET` /points/info

##### Request: `Object`

| Field    | Required | Remark                  |
| -------- | -------- | ----------------------- |
| contract | YES      | Points contract address |

##### Response `Object`

| Field    | Required | Remark                  |
| -------- | -------- | ----------------------- |
| contract | YES      | Points contract address |
| name     | YES      | Points name             |
| symbol   | YES      | Points symbol           |
| total    | YES      | Points total supply     |
| holders  | YES      | Points holders          |
| mints    | YES      | Points mint count       |

### Points records

`GET` /points/records

##### Request: `Object`

| Field    | Required | Remark                            |
| -------- | -------- | --------------------------------- |
| contract | YES      | Points contract address           |
| account  | NO       | Points receiver                   |
| page     | NO       | Page index. Default: 1            |
| size     | NO       | Page size. Default: 10, max: 1000 |

##### Request: `Array[Object]`

| Field   | Required | Remark                       |
| ------- | -------- | ---------------------------- |
| account | YES      | Points receiver              |
| amount  | YES      | Points value                 |
| data    | YES      | Remark info                  |
| hash    | YES      | Points mint transaction hash |

### Points rankings by time range

`GET` /points/rankings

##### Request: `Object`

| Field      | Required | Remark                                          |
| ---------- | -------- | ----------------------------------------------- |
| contract   | YES      | Points contract address                         |
| timestamp0 | NO       | Points mint timestamp(second) start. Default: 0 |
| timestamp1 | NO       | Points mint timestamp(second) end. Default: max |
| page       | NO       | Page index. Default: 1                          |
| size       | NO       | Page size. Default: 10, max: 1000               |

##### Response: `Array[Object]`

| Field    | Required | Remark                           |
| -------- | -------- | -------------------------------- |
| contract | YES      | Points contract address          |
| account  | YES      | Points receiver                  |
| total    | YES      | Points sum(amount) with receiver |
| mints    | YES      | Points mint count with receiver  |

### Account points

`GET` /points/account

#### Request: `Object`

| Field    | Required | Remark                  |
| -------- | -------- | ----------------------- |
| contract | YES      | Points contract address |
| account  | YES      | Points receiver         |

#### Response: `Array[Object]`

| Field    | Required | Remark                           |
| -------- | -------- | -------------------------------- |
| contract | YES      | Points contract address          |
| account  | YES      | Points receiver                  |
| total    | YES      | Points sum(amount) with receiver |
| mints    | YES      | Points mint count with receiver  |
| ranking  | YES      | Ranking index. Sort: `DESC`      |
