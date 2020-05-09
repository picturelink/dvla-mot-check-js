# dvla-mot-check-js
A simple javascript library for accessing the [DVLA MOT Check API](https://dvsa.github.io/mot-history-api-documentation/).

## How it works
Before getting started you will need to apply for an API key to access the service.

### Installation
To install dvla-mot-check-js:
```bash
npm install @picturelink/mot-check
# or
yarn add @picturelink/mot-check
```

### Using the client
Once installed, it's simply a case of creating an instance of the `MotClient` and calling methods on it:
```typescript
import { MotClient } from "@picturelink/mot-check";

const client = new MotClient("YOUR API KEY");
client.Timeout = 30; // In case 15 seconds isn't enough...

client.LookupVrm(vrm)
  .then((result) => {
    console.log(result);
  });
  
// or using async
const result = await client.LookupVrm(vrm);
```

# Reference

## Classes

<dl>
<dt><a href="#ApiError">ApiError</a></dt>
<dd><p>Represents an error thrown when the MOT History API returns an invalid response.</p>
</dd>
<dt><a href="#MotClient">MotClient</a></dt>
<dd><p>A simple client used to access the DVLA MOT History API.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#FailureReasonType">FailureReasonType</a></dt>
<dd><p>The possible values for the reason-for-failure type field.</p>
</dd>
<dt><a href="#FuelType">FuelType</a></dt>
<dd><p>The possible values for the fuel type field.</p>
</dd>
<dt><a href="#OdometerResultType">OdometerResultType</a></dt>
<dd><p>The possible values for the odometer result type field.</p>
</dd>
<dt><a href="#OdometerUnit">OdometerUnit</a></dt>
<dd><p>The possible values for the odometer unit field.</p>
</dd>
<dt><a href="#TestResult">TestResult</a></dt>
<dd><p>The possible values for the test result field.</p>
</dd>
</dl>

<a name="ApiError"></a>

## ApiError
Represents an error thrown when the MOT History API returns an invalid response.

**Kind**: global class
<a name="new_ApiError_new"></a>

### new ApiError(message, statusCode, error)
Creates an instance of the APIError class.


| Param | Description |
| --- | --- |
| message | The error message. |
| statusCode | The HTTP status code returned by the MOT History API. |
| error | The error object returned by the MOT History API. |

<a name="MotClient"></a>

## MotClient
A simple client used to access the DVLA MOT History API.

**Kind**: global class
**See**: [https://dvsa.github.io/mot-history-api-documentation/](https://dvsa.github.io/mot-history-api-documentation/)

* [MotClient](#MotClient)
    * [new MotClient(apiKey)](#new_MotClient_new)
    * _instance_
        * [.Timeout](#MotClient+Timeout)
        * [.Lookup(page)](#MotClient+Lookup) ⇒ <code>Array.&lt;MotHistory&gt;</code>
        * [.LookupDate(date, callback)](#MotClient+LookupDate) ⇒ <code>Array.&lt;MotHistory&gt;</code>
        * [.LookupDateTime(date, minute)](#MotClient+LookupDateTime) ⇒ <code>Array.&lt;MotHistory&gt;</code>
        * [.LookupVehicleId(vehicleId)](#MotClient+LookupVehicleId) ⇒ <code>MotHistory</code>
        * [.LookupVrm(registration)](#MotClient+LookupVrm) ⇒ <code>MotHistory</code>
    * _static_
        * [.IsBeta](#MotClient.IsBeta)
        * [.Version](#MotClient.Version)

<a name="new_MotClient_new"></a>

### new MotClient(apiKey)
Creates an instance of the MotClient class.


| Param | Description |
| --- | --- |
| apiKey | The API key used to access the DVLA MOT History API. |

<a name="MotClient+Timeout"></a>

### motClient.Timeout
The number of seconds after which a request times out.
Defaults to 15 seconds.

**Kind**: instance property of [<code>MotClient</code>](#MotClient)
<a name="MotClient+Lookup"></a>

### motClient.Lookup(page) ⇒ <code>Array.&lt;MotHistory&gt;</code>
Returns a promise containing a list of MOT history objects.

**Kind**: instance method of [<code>MotClient</code>](#MotClient)
**Returns**: <code>Array.&lt;MotHistory&gt;</code> - An array of MOT history records.
**Throws**:

- ApiError When the MOT History API returns an error response.


| Param | Default | Description |
| --- | --- | --- |
| page | <code>0</code> | The page number to retrieve (0 based). |

<a name="MotClient+LookupDate"></a>

### motClient.LookupDate(date, callback) ⇒ <code>Array.&lt;MotHistory&gt;</code>
Returns a promise containing a list of MOT history objects for the specified date.

**Kind**: instance method of [<code>MotClient</code>](#MotClient)
**Returns**: <code>Array.&lt;MotHistory&gt;</code> - An array of MOT history records.
**Throws**:

- ApiError When the MOT History API returns an error response.


| Param | Description |
| --- | --- |
| date | The date to lookup, any time part is discarded. |
| callback | An optional callback function that reports the progress. |

<a name="MotClient+LookupDateTime"></a>

### motClient.LookupDateTime(date, minute) ⇒ <code>Array.&lt;MotHistory&gt;</code>
Returns a promise containing a list of MOT history objects for the specified date.

**Kind**: instance method of [<code>MotClient</code>](#MotClient)
**Returns**: <code>Array.&lt;MotHistory&gt;</code> - An array of MOT history records.
**Throws**:

- ApiError When the MOT History API returns an error response.


| Param | Default | Description |
| --- | --- | --- |
| date |  | The date to lookup, any time part is discarded. |
| minute | <code>1</code> | The minute of the day, where 1 = 00:01, 330 = 05:30 1440 = 00:00 |

<a name="MotClient+LookupVehicleId"></a>

### motClient.LookupVehicleId(vehicleId) ⇒ <code>MotHistory</code>
Returns a promise containing an MOT history object for the specified vehicle.

**Kind**: instance method of [<code>MotClient</code>](#MotClient)
**Returns**: <code>MotHistory</code> - The MOT history record for the vehicle or null if not found.
**Throws**:

- ApiError When the MOT History API returns an error response.


| Param | Description |
| --- | --- |
| vehicleId | The unique DVLA ID of the vehicle. |

<a name="MotClient+LookupVrm"></a>

### motClient.LookupVrm(registration) ⇒ <code>MotHistory</code>
Returns a promise containing an MOT history object for the specified vehicle.

**Kind**: instance method of [<code>MotClient</code>](#MotClient)
**Returns**: <code>MotHistory</code> - The MOT history record for the vehicle or null if not found.
**Throws**:

- ApiError When the MOT History API returns an error response.


| Param | Description |
| --- | --- |
| registration | The vehicle registration mark. |

<a name="MotClient.IsBeta"></a>

### MotClient.IsBeta
A flag indicating whether this client consumes a beta version of the MOT History API.

**Kind**: static property of [<code>MotClient</code>](#MotClient)
<a name="MotClient.Version"></a>

### MotClient.Version
The version of the MOT History API that this client has been written for.

**Kind**: static property of [<code>MotClient</code>](#MotClient)
<a name="FailureReasonType"></a>

## FailureReasonType
The possible values for the reason-for-failure type field.

**Kind**: global variable
<a name="FuelType"></a>

## FuelType
The possible values for the fuel type field.

**Kind**: global variable
<a name="OdometerResultType"></a>

## OdometerResultType
The possible values for the odometer result type field.

**Kind**: global variable
<a name="OdometerUnit"></a>

## OdometerUnit
The possible values for the odometer unit field.

**Kind**: global variable
<a name="TestResult"></a>

## TestResult
The possible values for the test result field.

**Kind**: global variable
