---
title: TweenUtil
slug: /api/TweenUtil
---

Utility module for creating and controlling tweens, including a couple of **extended properties** (like `Scale` and `Pivot`) that aren’t directly tweenable on the target instance.

---

## Types

### `TweenData`

```lua
export type TweenData = {
	instance: Instance | Model | GuiObject,
	properties: { [string]: any },
	time: number,
	easingStyle: Enum.EasingStyle,
	easingDirection: Enum.EasingDirection,
}
```

- **instance**: the object you want to tween (e.g. `GuiObject`, `Model`, etc.).
- **properties**: a dictionary of properties to tween. Supports both normal tweenable properties and the extended properties listed below.
- **time / easingStyle / easingDirection**: passed into `TweenInfo.new(...)`.

---

## Extended properties

`TweenUtil` supports these special keys inside `TweenData.properties`:

- **`Scale`**: tweens a temporary `NumberValue` and applies it with `instance:ScaleTo(value)` each time it changes.
- **`Pivot`**: tweens a temporary `CFrameValue` and applies it with `instance:PivotTo(cframe)` each time it changes.

---

## Functions

### `New`

`TweenUtil.New(tweenData: TweenData) -> Tween`

Creates a tween controller instance and constructs one or more internal tweens from `tweenData.properties`.

### `CreateAndPlay`

`TweenUtil.CreateAndPlay(tweenData: TweenData) -> Tween`

Convenience constructor that calls `New(...)`, then immediately calls `:Play()`.

---

## Signals

### `completed`

`tween.completed: Signal`

Fires when **all** internal tweens have completed.

> After completion, the tween controller cleans up its connections/temporary instances.

---

## Instance Methods

### `Play`

`tween:Play() -> ()`

Plays all internal tweens. When every tween completes, `tween.completed` fires.

### `Pause`

`tween:Pause() -> ()`

Pauses all internal tweens.

### `Resume`

`tween:Resume() -> ()`

Resumes all internal tweens.

### `Cancel`

`tween:Cancel() -> ()`

Cancels all internal tweens.

### `Restart`

`tween:Restart() -> ()`

Cancels, then plays again.

### `Destroy`

`tween:Destroy() -> ()`

Destroys the tween controller and cleans up any Trove resources.

---

## Examples

### Tween a GUI position

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenUtil = require(ReplicatedStorage.Packages.TweenUtil)

local tween = TweenUtil.CreateAndPlay({
	instance = script.Parent.Frame,
	properties = {
		Position = UDim2.fromScale(0.5, 0.5),
	},
	time = 0.35,
	easingStyle = Enum.EasingStyle.Quad,
	easingDirection = Enum.EasingDirection.Out,
})

tween.completed:Connect(function()
	print("GUI tween finished")
end)
```

### Tween a Model pivot

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenUtil = require(ReplicatedStorage.Packages.TweenUtil)

local model = workspace:WaitForChild("Crate")

TweenUtil.CreateAndPlay({
	instance = model,
	properties = {
		Pivot = CFrame.new(0, 10, 0),
	},
	time = 0.6,
	easingStyle = Enum.EasingStyle.Sine,
	easingDirection = Enum.EasingDirection.InOut,
})
```

