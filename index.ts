/*
 * Copyright © 2020 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Configuration } from "@atomist/automation-client/lib/configuration";
import { githubConvergeSupport } from "@atomist/sdm-pack-rcca-github";
import { configure } from "@atomist/sdm/lib/core/machine/configure";
import * as _ from "lodash";

export const configuration = configure(async sdm => {

    sdm.addExtensionPacks(
        githubConvergeSupport(),
    );

    const cfg: Configuration = {
        ws: {
            timeout: 60000,
            termination: {
                gracePeriod: 1000 * 30, // 30s termination period
            },
        },
        cluster: {
            maxConcurrentPerWorker: 15,
        },
        redact: {
            log: true,
            messages: false,
        },
    };

    _.merge(sdm.configuration, cfg);

}, {
    name: "GitHub RCCA Software Delivery Machine",
});
