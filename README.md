# IRR -- A JS Library that Computes IRR and NPV

[![npm version](https://badge.fury.io/js/@8hobbies%2Firr.svg)](https://badge.fury.io/js/@8hobbies%2Firr)
[![pipeline status](https://gitlab.com/8hobbies/irr/badges/master/pipeline.svg)](https://gitlab.com/8hobbies/irr/-/commits/master)
[![coverage report](https://gitlab.com/8hobbies/irr/badges/master/coverage.svg)](https://gitlab.com/8hobbies/irr/-/commits/master)

A JavaScript/TypeScript library that computes [Internal Rate of Return (IRR)][] and [Net Present
Value (NPV)][]. The package provides two functions: `computeIrr` and `computeNpv`. Please refer to
the [online documentation][] or code comment in index.ts for detail.

## Contributing

Source code is available on [GitLab][source code].

To report a bug, visit the [issue tracker][].

To run test, run `npm run test-all`. To display test coverage, run `npm run coverage`. To build for
production, run `npm pack`. To build the documentation, run `npm run doc`.

To send your contribution, open a [merge request][].

## License

```text
Copyright 2023-2024 Hong Xu <hong@8hobbies.com>

Licensed under the Apache License, Version 2.0(the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[Internal Rate of Return (IRR)]: https://en.wikipedia.org/wiki/Internal_rate_of_return
[Net Present Value (NPV)]: https://en.wikipedia.org/wiki/Net_present_value
[issue tracker]: https://gitlab.com/8hobbies/irr/issues
[merge request]: https://gitlab.com/8hobbies/irr/-/merge_requests
[online documentation]: https://irr.8hobbies.com/modules.html
[source code]: https://gitlab.com/8hobbies/irr
