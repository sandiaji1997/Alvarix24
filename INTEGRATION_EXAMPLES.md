# Alvarix SecureAI Integration Examples

Production endpoint:

```text
https://alvarix24-production.up.railway.app/api/risk-score
```

Required header:

```text
x-api-key: <ALVARIX_API_KEY>
```

## JavaScript Fetch

```js
const response = await fetch('https://alvarix24-production.up.railway.app/api/risk-score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ALVARIX_API_KEY
  },
  body: JSON.stringify({
    user_id: 'usr_123',
    context: 'transaction',
    amount: 125.5,
    location: 'ID',
    device: 'android'
  })
})

const risk = await response.json()
console.log(risk)
```

## Node.js Axios

```js
import axios from 'axios'

const { data: risk } = await axios.post(
  'https://alvarix24-production.up.railway.app/api/risk-score',
  {
    user_id: 'usr_123',
    context: 'transaction',
    amount: 125.5,
    location: 'ID',
    device: 'android'
  },
  {
    headers: {
      'x-api-key': process.env.ALVARIX_API_KEY
    }
  }
)

console.log(risk)
```

## Python Requests

```python
import os
import requests

response = requests.post(
    "https://alvarix24-production.up.railway.app/api/risk-score",
    headers={
        "Content-Type": "application/json",
        "x-api-key": os.environ["ALVARIX_API_KEY"],
    },
    json={
        "user_id": "usr_123",
        "context": "transaction",
        "amount": 125.5,
        "location": "ID",
        "device": "android",
    },
)

risk = response.json()
print(risk)
```

## PHP cURL

```php
<?php

$payload = [
  "user_id" => "usr_123",
  "context" => "transaction",
  "amount" => 125.5,
  "location" => "ID",
  "device" => "android"
];

$ch = curl_init("https://alvarix24-production.up.railway.app/api/risk-score");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "x-api-key: " . getenv("ALVARIX_API_KEY")
  ],
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_RETURNTRANSFER => true
]);

$risk = json_decode(curl_exec($ch), true);
curl_close($ch);

print_r($risk);
```

## Go

```go
package main

import (
  "bytes"
  "fmt"
  "io"
  "net/http"
  "os"
)

func main() {
  body := []byte(`{
    "user_id": "usr_123",
    "context": "transaction",
    "amount": 125.5,
    "location": "ID",
    "device": "android"
  }`)

  req, err := http.NewRequest(
    "POST",
    "https://alvarix24-production.up.railway.app/api/risk-score",
    bytes.NewBuffer(body),
  )
  if err != nil {
    panic(err)
  }

  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("x-api-key", os.Getenv("ALVARIX_API_KEY"))

  res, err := http.DefaultClient.Do(req)
  if err != nil {
    panic(err)
  }
  defer res.Body.Close()

  responseBody, _ := io.ReadAll(res.Body)
  fmt.Println(string(responseBody))
}
```
