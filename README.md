# Scroller bittrex websocket nodejs

__version__: 0.0.3

Bittrex websocket scroller with docker container and Ansible script for deploy.
This scroller is developped with an nodejs application and a mysql container for
embeded the storage system. All script for manage platform or deploy are using
Ansible.

> Feel free to improve it or propose your ideas to improve it.

## summary:

- [Introduction](#introduction)
- [Install](#install)
- [Start](#start)
- [Utils](#utils)
- [Deploy on server](#deploy-on-server)
- [References](#references)


## Introduction

All of these requirements are needed for a local usage.

### Requirements:
- [Python3](https://www.python.org)
- [Docker](https://www.docker.com)
- [Docker-compose](https://docs.docker.com/compose/)
- [Docker network](https://docs.docker.com/network/)

for a server deployment you also need Ansible was installed and the remote hosts are
available to be managed by Ansible.
### Server Deployment Requirements:
- [Ansible](https://www.ansible.com)
- Remote available for ansible managing

> The server deployment install packages, a list of this package is available: [here](#ansible-install-packages)


## Install

First at all you must install the scroller configuration.
The scroller configuration is a list of cryptocurrency markets store in `config.yml`.

Generate the config file (use python3 script):
```shell
# with make
make install

# if you have any failed with make it's probably because of the python location,
# run the python script manually or make the python3 binary works with
# the command `python3 --version`

python3 config/set_markets_configuration/getMarket.py
```
If this command failed because of missing python3 yaml package install it and retry.

> The python script provide the Bittrex python api wrapper but feel free [to stars the repository](https://github.com/ericsomdahl/python-bittrex).

That will get all available market from Bittrex broker and set into `config.yml`,
You must now set which markets your scroller's will get.

open `config.yml`:
```yaml
target_base_currency_market:
- USDT
baseCurrency:
- BTC
- USDT
- ETH
BTC:
- BTC-LTC
- BTC-DOGE
- BTC-VTC
...
```
Add these lines 'target_base_currency_market' at the top of your file,
target_base_currency_market will be use to chose which market ticker
will be insert into the database.

In the case above, I want my scroller target all market with base currency 'USDT'.

Create a docker network for your scroller:
```shell
docker network create websocket-scroller;

# verify with :

docker network ls;
NETWORK ID          NAME                               DRIVER              SCOPE
0db2807c2564        websocket-scroller                 bridge              local
```

## Start

For start the scroller you have to:
```shell
make

# or

make up
```

> take a look at the [Documentation section](#documentation)

## Utils

you can extract the data of your scroller by making a dumps.
the makefile provide a command for it:
```shell
make dumps
```
then it generate a mysql-dumps on the root directory  at `backup.sql`.

## Deploy on servers

The project provide on the `server_deploy/` directory a full Ansible script
for being able to make a fast deploy on your servers.

#### little instruction for beginer with ansible

Ansible is a sofware which make the managing of remote server easy, Ansible is an agentless software,
that mean you doesn't need something install on the remote host for using it(except a /bin/python).

The install with ansible will be provide by push ssh.

> Take a look on the Ansible [website](https://www.ansible.com) and [documentation](http://docs.ansible.com/ansible/latest/user_guide/playbooks.html)
> for understand the basic usage of the technologie.

#### set your host configuration.

You must set where you want to deploy, let's open the `server_deploy/inventory` file.

It contain `[scroller]` section, below this section you can add all remote host you want to provide with the script.

```yaml
[scroller]
scroller.servera.com
scroller.serverb.com
scroller.serverc.com
```
You can test if your inventory file can be target by ansible with a ping like :
```shell
$ ansible -m ping scroller
scroller.servera.com | FAILED! => {
    "changed": false,
    "module_stderr": "Shared connection to scroller.servera.com closed.\r\n",
    "module_stdout": "/bin/sh: /usr/bin/python: No such file or directory\r\n",
    "msg": "MODULE FAILURE",
    "rc": 0
}
scroller.serverb.com | FAILED! => {
...
```

If you have the same error you have to install python.

install ansible roles:
```
ansible-galaxy install geerlingguy.docker
```

the script use galaxy role from greerlingguy because his use good practice and
it's easy to use.

> You can found more information about [Ansible Galaxy here](http://docs.ansible.com/ansible/latest/reference_appendices/galaxy.html) and the github of [geerlingguy here](https://github.com/geerlingguy).

Change directory to `server_deploy`:
```
cd server_deploy
```

Next you have to set the location of your bot on your remote hosts:
```
vi inventory;
...
[scroller:vars]
scroller_path=/path/to/your/bot/tickerBot/
```

Before runing script you have to know what it does:
1. install docker with the external role from geerlingguy
2. install python3 and python3-pip + upgrade pip
3. clone the platform repository, then make it 2 time one for init mysql, seconde for run bot.

Run script:
```
ansible-playbook deploy_bot.yml  -K
```
The option -K is for the packages installation, the script need the root permission to run package manager,
so the -K option ask what is the sudo password.(its possible to specifying in the hosts file, take a
look at the Ansible documentation)


for get the sql dump you have to connect to your remote hosts for run the command `make dumps`,
then use scp to get it locally.

## logs
you can verify your module is up with:
```shell
  make ps
```

for logs:
```shell
  # all logs
  make logs
```

## Documentation

_Makefile commands available_:

| **commands name** | **description**              |
|:-----------------:|:---------------------------- |
|      `make`       | 1. down each service         |
|                   | 2. build basic project       |
|                   | 3. run project               |
|                   |                              |
|  `make build_up`  | 1. build basic project       |
|                   | 2. run project               |
|                   |                              |
|   `make build`    | build basic project.         |
|                   |                              |
|     `make up`     | run project                  |
|                   |                              |
|    `make down`    | down project                 |
|                   |                              |
|     `make ps`     | list container               |
|                   |                              |
|   `make dumps`    | make a sql dumps of tickers. |
|                   |                              |
|    `make logs`    | display all logs             |

_Tricks_:

|              **commands**              | **description**         |
|:--------------------------------------:|:----------------------- |
| `docker network create "Network-Name"` | Create a docker network |
|          `docker network ls`           | List docker network     |

_Troubles possible_:

make logs failed:
if the commands failed use the docker-compose command:
`docker-compose logs`

## Reference


> - [Mysql compose hub](https://hub.docker.com/_/mysql/)
> - [Mysql documentation](https://dev.mysql.com/doc/)
> - [Docker website](https://www.docker.com)
> - [Docker-compose documentation](https://docs.docker.com/compose/)
> - [Git documentation](https://git-scm.com/documentation)
> - [Docker network documentation](https://docs.docker.com/engine/userguide/networking/work-with-networks/)

### Ansible install packages

- docker
- docker-compose
- websocket-scroller (by github clonging)

## version

| **Version** | **Description**                                       |
|:-----------:|:----------------------------------------------------- |
|    0.0.1    | Connect websocket client and display ticker |
|    0.0.2    | Connect websocket client and store ticker in database |
|      0.0.3       |           Store ticker on database + base deploy                                            |
