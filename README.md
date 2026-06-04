# ChineseHolidayCalendar SDK

Look up China's public holidays and statutory off-days by year

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Chinese Holiday Calendar

The Chinese Holiday Calendar API exposes public holiday data for China, served from `https://api.jiejiariapi.com/v1`. It is catalogued on [Free Public APIs](https://freepublicapis.com/chinese-holiday-calendar) as a community-tracked endpoint.

What you get from the API:

- Annual listings of Chinese public holidays, queryable by year (for example, `GET /holidays/2024`).
- Holiday names, dates, and off-day status for each entry.

The service is HTTP-only and, per the community catalogue listing, does not document an authentication requirement. CORS is reported as disabled, so browser-side calls may need a proxy. License terms are not published; check with the provider before redistributing the data.

## Try it

**TypeScript**
```bash
npm install chinese-holiday-calendar
```

**Python**
```bash
pip install chinese-holiday-calendar-sdk
```

**PHP**
```bash
composer require voxgig/chinese-holiday-calendar-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/chinese-holiday-calendar-sdk/go
```

**Ruby**
```bash
gem install chinese-holiday-calendar-sdk
```

**Lua**
```bash
luarocks install chinese-holiday-calendar-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ChineseHolidayCalendarSDK } from 'chinese-holiday-calendar'

const client = new ChineseHolidayCalendarSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o chinese-holiday-calendar-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "chinese-holiday-calendar": {
      "command": "/abs/path/to/chinese-holiday-calendar-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Holiday** | A Chinese public holiday entry — name, date, and off-day status — listed by year at `/holidays/{year}` (e.g. `/holidays/2024`). | `/holidays/{year}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from chineseholidaycalendar_sdk import ChineseHolidayCalendarSDK

client = ChineseHolidayCalendarSDK({})


# Load a specific holiday
holiday, err = client.Holiday(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'chineseholidaycalendar_sdk.php';

$client = new ChineseHolidayCalendarSDK([]);


// Load a specific holiday
[$holiday, $err] = $client->Holiday(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/chinese-holiday-calendar-sdk/go"

client := sdk.NewChineseHolidayCalendarSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ChineseHolidayCalendar_sdk"

client = ChineseHolidayCalendarSDK.new({})


# Load a specific holiday
holiday, err = client.Holiday(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("chinese-holiday-calendar_sdk")

local client = sdk.new({})


-- Load a specific holiday
local holiday, err = client:Holiday(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ChineseHolidayCalendarSDK.test()
const result = await client.Holiday().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ChineseHolidayCalendarSDK.test(None, None)
result, err = client.Holiday(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ChineseHolidayCalendarSDK::test(null, null);
[$result, $err] = $client->Holiday(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Holiday(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ChineseHolidayCalendarSDK.test(nil, nil)
result, err = client.Holiday(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Holiday(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Chinese Holiday Calendar

- Upstream: [https://api.jiejiariapi.com/v1](https://api.jiejiariapi.com/v1)
- API docs: [https://freepublicapis.com/chinese-holiday-calendar](https://freepublicapis.com/chinese-holiday-calendar)

---

Generated from the Chinese Holiday Calendar OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
