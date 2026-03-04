---
title: Sync
slug: /api/Sync
---

Basic networking module for creating and handling static `RemoteEvent`s and `RemoteFunction`s (paired per endpoint name), with **rate limiting** and **payload byte limiting**.

> Style inspiration: RbxUtil `Net` docs ([link](https://sleitnick.github.io/RbxUtil/api/Net/)).

## One shared remote folder (important)

You only need **one copy of the Sync module** required by both server and client.

All endpoints share the same container:

- `ReplicatedStorage.Remotes`

For each `Sync:Create("X")`:

- RemoteEvent: `ReplicatedStorage.Remotes.X`
- RemoteFunction: `ReplicatedStorage.Remotes.XFunction`

## Quick example (examples only)

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Sync = require(ReplicatedStorage.Packages.Sync)

local PointsChanged = Sync:Create("PointsChanged")
	:SetRateLimit(10)
	:SetByteLimit(1024)
	:SetMode(Sync.Modes.Burst)
```

Client:

```lua
PointsChanged:Connect(function(points)
	print("Points", points)
end)
```

Server:

```lua
PointsChanged:FireAll(10)
```

---

## Functions

### `Create`

`Sync:Create(name: string) -> Sync`

Creates (or returns) a Sync endpoint.

- On the **server**, creates the `RemoteEvent` and `RemoteFunction` under `ReplicatedStorage.Remotes`.
- On the **client**, waits up to 10 seconds for the folder/remotes to exist.
- If a Sync with the same name already exists, warns and returns the existing one.

```lua
local sync = Sync:Create("Test.Ping")
```

### `Init`

`Sync:Init() -> ()`

One-time module initializer:

- On server: calls `Sync:InitServer()`
- On client: calls `Sync:InitClient()`

> `Sync:Create()` calls this automatically.

### `InitServer`

**Server**

`Sync:InitServer() -> ()`

One-time server initializer (safe to call multiple times).

### `InitClient`

**Client**

`Sync:InitClient() -> ()`

One-time client initializer (safe to call multiple times).

---

## Types / Modes

### `Modes`

```lua
Sync.Modes = {
	Throttle = "Throttle",
	Burst = "Burst",
}
```

- **Throttle**: enforces a minimum interval between calls (`1 / rateLimit` seconds).
- **Burst**: allows up to `rateLimit` calls per second (simple per-second bucket).

---

## Instance Methods

### `Connect`

`sync:Connect(callback: (...any) -> ()) -> { Disconnect: () -> () }?`

Connects a handler to the endpoint’s `RemoteEvent`.

```lua
-- Client
sync:Connect(function(...)
	print("Got", ...)
end)

-- Server
sync:Connect(function(player, ...)
	print("From", player.Name, ...)
end)
```

### `OnInvoke`

`sync:OnInvoke(callback: (...any) -> ...any) -> { Disconnect: () -> () }?`

Sets the invocation handler for the endpoint’s `RemoteFunction`.

```lua
-- Server
sync:OnInvoke(function(player, request)
	return { ok = true }
end)
```

### `Fire`

**Client**

`sync:Fire(...any) -> ()`

Fires client → server (drops if rate-limited or byte-limited).

```lua
sync:Fire("hello")
```

### `InvokeServer`

**Client**

`sync:InvokeServer(...any) -> ...any`

Invokes client → server (drops if rate-limited or byte-limited).

```lua
local result = sync:InvokeServer("GetData")
```

### `FireAll`

**Server**

`sync:FireAll(...any) -> ()`

Fires to all players (per-player rate limiting; drops oversize payloads).

```lua
sync:FireAll("announcement")
```

### `FireClient`

**Server**

`sync:FireClient(player: Player, ...any) -> ()`

Fires to one player (drops if rate-limited/byte-limited).

```lua
sync:FireClient(player, "hello")
```

### `FireExcept`

**Server**

`sync:FireExcept(players: { Player }, ...any) -> ()`

Fires to all players except the given list.

```lua
sync:FireExcept({playerA, playerB}, "everyone else")
```

### `InvokeClient`

**Server**

`sync:InvokeClient(player: Player, ...any) -> ...any`

Invokes a client via `RemoteFunction:InvokeClient` (drops if rate-limited/byte-limited).

```lua
local ok = sync:InvokeClient(player, "Ping")
```

### `Destroy`

`sync:Destroy() -> ()`

Destroys server-created remotes (server) and cleans connections/tasks (all realms).

---

## Configuration

### `SetRateLimit`

`sync:SetRateLimit(perSecondLimit: number) -> Sync`

```lua
sync:SetRateLimit(15)
```

### `SetMode`

`sync:SetMode(mode: string) -> Sync`

```lua
sync:SetMode(Sync.Modes.Burst)
```

### `SetByteLimit`

`sync:SetByteLimit(byteLimit: number) -> Sync`

```lua
sync:SetByteLimit(1024)
```

