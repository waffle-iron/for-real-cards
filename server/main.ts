import * as log from 'loglevel';

import "/imports/for-real-cards/api"
import "/imports/common-app/api"
import {initServer} from "../imports/for-real-cards/api/index";

log.setLevel(0, true)
log.debug('log leve set to 0')

initServer();