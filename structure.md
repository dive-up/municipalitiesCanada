<!-- provincial / territory data -->
Alberta = name, status (urban and rural)
British Columbia = name, status, regionalDistrict
Manitoba = name, status (urban) | name (rural, localGovernmentDistricts)
New Brunswick = name, status, regionalServiceCommission
New Foundland and Labrador = name, status
Nova Scotia = name, status, county
Ontario = name, status, censusDivision (lower-tier) | name, status (upper-tier)
Quebec = name, status, regionalCountyMunicipality
Sasketchwan = name, status, ruralMunicipality (urban) | name, status (northern) | name (rural)
Prince Edward Island = name, status, county
Northwest Territories = name, status
Nunavut = name, status
Yukon = name, status, officialName

<!-- structure -->

```javascript
data =  [
            {
                'province/territory' : {
                    description: value
                    municipality: [
                                    {
                                        name: value,
                                        status: value,
                                        addInfo: {...extraInfo}
                                    }
                                ],
                 }
            }
        ]
```

'extraInfo' is a placeholder for data not common such as regionalDistrict, regionalServiceCommission, regionalCountyMunicipality, ruralMunicipality, officalName, county.
