define(function () {
    var countries = [
        {
            name: "Afghanistan",
            alternative: "AF افغانستان"
        },

        {
            name: "Åland Islands",
            alternative: "AX Aaland Aland"
        },

        {
            name: "Albania",
            alternative: "AL"
        },

        {
            name: "Algeria",
            alternative: "DZ الجزائر"
        },

        {
            name: "American Samoa",
            alternative: "AS"
        },

        {
            name: "Andorra",
            alternative: "AD"
        },

        {
            name: "Angola",
            alternative: "AO"
        },

        {
            name: "Anguilla",
            alternative: "AI"
        },

        {
            name: "Antarctica",
            alternative: "AQ"
        },

        {
            name: "Antigua And Barbuda",
            alternative: "AG"
        },

        {
            name: "Argentina",
            alternative: "AR"
        },

        {
            name: "Armenia",
            alternative: "AM Հայաստան"
        },

        {
            name: "Aruba",
            alternative: "AW"
        },

        {
            name: "Australia",
            alternative: "AU"
        },

        {
            name: "Austria",
            alternative: "AT Österreich Osterreich Oesterreich "
        },

        {
            name: "Azerbaijan",
            alternative: "AZ"
        },

        {
            name: "Bahamas",
            alternative: "BS"
        },

        {
            name: "Bahrain",
            alternative: "BH البحرين"
        },

        {
            name: "Bangladesh",
            alternative: "BD বাংলাদেশ"
        },

        {
            name: "Barbados",
            alternative: "BB"
        },

        {
            name: "Belarus",
            alternative: "BY Беларусь"
        },

        {
            name: "Belgium",
            alternative: "BE België Belgie Belgien Belgique"
        },

        {
            name: "Belize",
            alternative: "BZ"
        },

        {
            name: "Benin",
            alternative: "BJ"
        },

        {
            name: "Bermuda",
            alternative: "BM"
        },

        {
            name: "Bhutan",
            alternative: "BT भूटान"
        },

        {
            name: "Bolivia",
            alternative: "BO"
        },

        {
            name: "Bonaire, Sint Eustatius and Saba",
            alternative: "BQ"
        },

        {
            name: "Bosnia and Herzegovina",
            alternative: "BA BiH Bosna i Hercegovina Босна и Херцеговина"
        },

        {
            name: "Botswana",
            alternative: "BW"
        },

        {
            name: "Bouvet Island",
            alternative: "BV"
        },

        {
            name: "Brazil",
            alternative: "BR Brasil"
        },

        {
            name: "British Indian Ocean Territory",
            alternative: "IO"
        },

        {
            name: "Brunei Darussalam",
            alternative: "BN"
        },

        {
            name: "Bulgaria",
            alternative: "BG България"
        },

        {
            name: "Burkina Faso",
            alternative: "BF"
        },

        {
            name: "Burundi",
            alternative: "BI"
        },

        {
            name: "Cambodia",
            alternative: "KH កម្ពុជា"
        },

        {
            name: "Cameroon",
            alternative: "CM"
        },

        {
            name: "Canada",
            alternative: "CA"
        },

        {
            name: "Cape Verde",
            alternative: "CV Cabo"
        },

        {
            name: "Cayman Islands",
            alternative: "KY"
        },

        {
            name: "Central African Republic",
            alternative: "CF"
        },

        {
            name: "Chad",
            alternative: "TD تشاد‎ Tchad"
        },

        {
            name: "Chile",
            alternative: "CL"
        },

        {
            name: "China",
            alternative: "CN Zhongguo Zhonghua Peoples Republic 中国/中华"
        },

        {
            name: "Christmas Island",
            alternative: "CX"
        },

        {
            name: "Cocos (Keeling) Islands",
            alternative: "CC"
        },

        {
            name: "Colombia",
            alternative: "CO"
        },

        {
            name: "Comoros",
            alternative: "KM جزر القمر"
        },

        {
            name: "Congo",
            alternative: "CG"
        },

        {
            name: "Congo, the Democratic Republic of the",
            alternative: "CD Congo-Brazzaville Repubilika ya Kongo"
        },

        {
            name: "Cook Islands",
            alternative: "CK"
        },

        {
            name: "Costa Rica",
            alternative: "CR"
        },

        {
            name: "Côte d'Ivoire",
            alternative: "CI Cote dIvoire"
        },

        {
            name: "Croatia",
            alternative: "HR Hrvatska"
        },

        {
            name: "Cuba",
            alternative: "CU"
        },

        {
            name: "Curaçao",
            alternative: "CW Curacao"
        },

        {
            name: "Cyprus",
            alternative: "CY Κύπρος Kýpros Kıbrıs"
        },

        {
            name: "Czech Republic",
            alternative: "CZ Česká Ceska"
        },

        {
            name: "Denmark",
            alternative: "DK Danmark"

        },

        {
            name: "Djibouti",
            alternative: "DJ جيبوتي‎ Jabuuti Gabuuti"
        },

        {
            name: "Dominica",
            alternative: "DM Dominique"
        },

        {
            name: "Dominican Republic",
            alternative: "DO"
        },

        {
            name: "Ecuador",
            alternative: "EC"
        },

        {
            name: "Egypt",
            alternative: "EG"

        },

        {
            name: "El Salvador",
            alternative: "SV"
        },

        {
            name: "Equatorial Guinea",
            alternative: "GQ"
        },

        {
            name: "Eritrea",
            alternative: "ER إرتريا ኤርትራ"
        },

        {
            name: "Estonia",
            alternative: "EE Eesti"
        },

        {
            name: "Ethiopia",
            alternative: "ET ኢትዮጵያ"
        },

        {
            name: "Falkland Islands (Malvinas)",
            alternative: "FK"
        },

        {
            name: "Faroe Islands",
            alternative: "FO Føroyar Færøerne"
        },

        {
            name: "Fiji",
            alternative: "FJ Viti फ़िजी"
        },

        {
            name: "Finland",
            alternative: "FI Suomi"
        },

        {
            name: "France",
            alternative: "FR République française"

        },

        {
            name: "French Guiana",
            alternative: "GF"
        },

        {
            name: "French Polynesia",
            alternative: "PF Polynésie française"
        },

        {
            name: "French Southern Territories",
            alternative: "TF"
        },

        {
            name: "Gabon",
            alternative: "GA République Gabonaise"
        },

        {
            name: "Gambia",
            alternative: "GM"
        },

        {
            name: "Georgia",
            alternative: "GE საქართველო"
        },

        {
            name: "Germany",
            alternative: "DE Bundesrepublik Deutschland"

        },

        {
            name: "Ghana",
            alternative: "GH"
        },

        {
            name: "Gibraltar",
            alternative: "GI"
        },

        {
            name: "Greece",
            alternative: "GR Ελλάδα"

        },

        {
            name: "Greenland",
            alternative: "GL grønland"
        },

        {
            name: "Grenada",
            alternative: "GD"
        },

        {
            name: "Guadeloupe",
            alternative: "GP"
        },

        {
            name: "Guam",
            alternative: "GU"
        },

        {
            name: "Guatemala",
            alternative: "GT"
        },

        {
            name: "Guernsey",
            alternative: "GG"
        },

        {
            name: "Guinea",
            alternative: "GN"
        },

        {
            name: "Guinea-Bissau",
            alternative: "GW"
        },

        {
            name: "Guyana",
            alternative: "GY"
        },

        {
            name: "Haiti",
            alternative: "HT"
        },

        {
            name: "Heard Island and McDonald Islands",
            alternative: "HM"
        },

        {
            name: "Holy See (Vatican City State)",
            alternative: "VA"
        },

        {
            name: "Honduras",
            alternative: "HN"
        },

        {
            name: "Hong Kong",
            alternative: "HK 香港"
        },

        {
            name: "Hungary",
            alternative: "HU Magyarország"
        },

        {
            name: "Iceland",
            alternative: "IS Island"
        },

        {
            name: "India",
            alternative: "IN भारत गणराज्य Hindustan"

        },

        {
            name: "Indonesia",
            alternative: "ID"

        },

        {
            name: "Iran, Islamic Republic of",
            alternative: "IR ایران"
        },

        {
            name: "Iraq",
            alternative: "IQ العراق‎"
        },

        {
            name: "Ireland",
            alternative: "IE Éire"
        },

        {
            name: "Isle of Man",
            alternative: "IM"
        },

        {
            name: "Israel",
            alternative: "IL إسرائيل ישראל"
        },

        {
            name: "Italy",
            alternative: "IT Italia"

        },

        {
            name: "Jamaica",
            alternative: "JM"
        },

        {
            name: "Japan",
            alternative: "JP Nippon Nihon 日本"

        },

        {
            name: "Jersey",
            alternative: "JE"
        },

        {
            name: "Jordan",
            alternative: "JO الأردن"
        },

        {
            name: "Kazakhstan",
            alternative: "KZ Қазақстан Казахстан"
        },

        {
            name: "Kenya",
            alternative: "KE"
        },

        {
            name: "Kiribati",
            alternative: "KI"
        },

        {
            name: "Korea, Democratic People's Republic of",
            alternative: "KP North Korea"
        },

        {
            name: "Korea, Republic of",
            alternative: "KR South Korea"
        },

        {
            name: "Kuwait",
            alternative: "KW الكويت"
        },

        {
            name: "Kyrgyzstan",
            alternative: "KG Кыргызстан"
        },

        {
            name: "Lao People's Democratic Republic",
            alternative: "LA"
        },

        {
            name: "Latvia",
            alternative: "LV Latvija"
        },

        {
            name: "Lebanon",
            alternative: "LB لبنان"
        },

        {
            name: "Lesotho",
            alternative: "LS"
        },

        {
            name: "Liberia",
            alternative: "LR"
        },

        {
            name: "Libyan Arab Jamahiriya",
            alternative: "LY ليبيا"
        },

        {
            name: "Liechtenstein",
            alternative: "LI"
        },

        {
            name: "Lithuania",
            alternative: "LT Lietuva"
        },

        {
            name: "Luxembourg",
            alternative: "LU"
        },

        {
            name: "Macao",
            alternative: "MO"
        },

        {
            name: "Macedonia, The Former Yugoslav Republic Of",
            alternative: "MK Македонија"
        },

        {
            name: "Madagascar",
            alternative: "MG Madagasikara"
        },

        {
            name: "Malawi",
            alternative: "MW"
        },

        {
            name: "Malaysia",
            alternative: "MY"
        },

        {
            name: "Maldives",
            alternative: "MV"
        },

        {
            name: "Mali",
            alternative: "ML"
        },

        {
            name: "Malta",
            alternative: "MT"
        },

        {
            name: "Marshall Islands",
            alternative: "MH"
        },

        {
            name: "Martinique",
            alternative: "MQ"
        },

        {
            name: "Mauritania",
            alternative: "MR الموريتانية"
        },

        {
            name: "Mauritius",
            alternative: "MU"
        },

        {
            name: "Mayotte",
            alternative: "YT"
        },

        {
            name: "Mexico",
            alternative: "MX Mexicanos"

        },

        {
            name: "Micronesia, Federated States of",
            alternative: "FM"
        },

        {
            name: "Moldova, Republic of",
            alternative: "MD"
        },

        {
            name: "Monaco",
            alternative: "MC"
        },

        {
            name: "Mongolia",
            alternative: "MN Mongγol ulus Монгол улс"
        },

        {
            name: "Montenegro",
            alternative: "ME"
        },

        {
            name: "Montserrat",
            alternative: "MS"
        },

        {
            name: "Morocco",
            alternative: "MA المغرب"
        },

        {
            name: "Mozambique",
            alternative: "MZ Moçambique"
        },

        {
            name: "Myanmar",
            alternative: "MM"
        },

        {
            name: "Namibia",
            alternative: "NA Namibië"
        },

        {
            name: "Nauru",
            alternative: "NR Naoero"
        },

        {
            name: "Nepal",
            alternative: "NP नेपाल"
        },

        {
            name: "Netherlands",
            alternative: "NL Holland Nederland"

        },

        {
            name: "New Caledonia",
            alternative: "NC"
        },

        {
            name: "New Zealand",
            alternative: "NZ Aotearoa"
        },

        {
            name: "Nicaragua",
            alternative: "NI"
        },

        {
            name: "Niger",
            alternative: "NE Nijar"
        },

        {
            name: "Nigeria",
            alternative: "NG Nijeriya Naíjíríà"

        },

        {
            name: "Niue",
            alternative: "NU"
        },

        {
            name: "Norfolk Island",
            alternative: "NF"
        },

        {
            name: "Northern Mariana Islands",
            alternative: "MP"
        },

        {
            name: "Norway",
            alternative: "NO Norge Noreg"

        },

        {
            name: "Oman",
            alternative: "OM عمان"
        },

        {
            name: "Pakistan",
            alternative: "PK پاکستان"

        },

        {
            name: "Palau",
            alternative: "PW"
        },

        {
            name: "Palestinian Territory, Occupied",
            alternative: "PS فلسطين"
        },

        {
            name: "Panama",
            alternative: "PA"
        },

        {
            name: "Papua New Guinea",
            alternative: "PG"
        },

        {
            name: "Paraguay",
            alternative: "PY"
        },

        {
            name: "Peru",
            alternative: "PE"
        },

        {
            name: "Philippines",
            alternative: "PH Pilipinas"

        },

        {
            name: "Pitcairn",
            alternative: "PN"
        },

        {
            name: "Poland",
            alternative: "PL Polska"

        },

        {
            name: "Portugal",
            alternative: "PT Portuguesa"

        },

        {
            name: "Puerto Rico",
            alternative: "PR"
        },

        {
            name: "Qatar",
            alternative: "QA قطر"
        },

        {
            name: "Réunion",
            alternative: "RE Reunion"
        },

        {
            name: "Romania",
            alternative: "RO Rumania Roumania România"
        },

        {
            name: "Russian Federation",
            alternative: "RU Rossiya Российская Россия"

        },

        {
            name: "Rwanda",
            alternative: "RW"
        },

        {
            name: "Saint Barthélemy",
            alternative: "BL St. Barthelemy"
        },

        {
            name: "Saint Helena",
            alternative: "SH St."
        },

        {
            name: "Saint Kitts and Nevis",
            alternative: "KN St."
        },

        {
            name: "Saint Lucia",
            alternative: "LC St."
        },

        {
            name: "Saint Martin (French Part)",
            alternative: "MF St."

        },

        {
            name: "Saint Pierre and Miquelon",
            alternative: "PM St."
        },

        {
            name: "Saint Vincent and the Grenadines",
            alternative: "VC St."
        },

        {
            name: "Samoa",
            alternative: "WS"
        },

        {
            name: "San Marino",
            alternative: "SM RSM Repubblica"
        },

        {
            name: "Sao Tome and Principe",
            alternative: "ST"
        },

        {
            name: "Saudi Arabia",
            alternative: "SA السعودية"
        },

        {
            name: "Senegal",
            alternative: "SN Sénégal"
        },

        {
            name: "Serbia",
            alternative: "RS Србија Srbija"
        },

        {
            name: "Seychelles",
            alternative: "SC"
        },

        {
            name: "Sierra Leone",
            alternative: "SL"
        },

        {
            name: "Singapore",
            alternative: "SG Singapura  சிங்கப்பூர் குடியரசு 新加坡共和国"
        },

        {
            name: "Sint Maarten (Dutch Part)",
            alternative: "SX"
        },

        {
            name: "Slovakia",
            alternative: "SK Slovenská Slovensko"
        },

        {
            name: "Slovenia",
            alternative: "SI Slovenija"
        },

        {
            name: "Solomon Islands",
            alternative: "SB"
        },

        {
            name: "Somalia",
            alternative: "SO الصومال"
        },

        {
            name: "South Africa",
            alternative: "ZA RSA Suid-Afrika"
        },

        {
            name: "South Georgia and the South Sandwich Islands",
            alternative: "GS"
        },

        {
            name: "South Sudan",
            alternative: "SS"
        },

        {
            name: "Spain",
            alternative: "ES España"

        },

        {
            name: "Sri Lanka",
            alternative: "LK ශ්‍රී ලංකා இலங்கை Ceylon"
        },

        {
            name: "Sudan",
            alternative: "SD السودان"
        },

        {
            name: "Suriname",
            alternative: "SR शर्नम् Sarnam Sranangron"
        },

        {
            name: "Svalbard and Jan Mayen",
            alternative: "SJ"
        },

        {
            name: "Swaziland",
            alternative: "SZ weSwatini Swatini Ngwane"
        },

        {
            name: "Sweden",
            alternative: "SE Sverige"

        },

        {
            name: "Switzerland",
            alternative: "CH Swiss Confederation Schweiz Suisse Svizzera Svizra"

        },

        {
            name: "Syrian Arab Republic",
            alternative: "SY Syria سورية"
        },

        {
            name: "Taiwan, Province of China",
            alternative: "TW 台灣 臺灣"
        },

        {
            name: "Tajikistan",
            alternative: "TJ Тоҷикистон Toçikiston"
        },

        {
            name: "Tanzania, United Republic of",
            alternative: "TZ"
        },

        {
            name: "Thailand",
            alternative: "TH ประเทศไทย Prathet Thai"
        },

        {
            name: "Timor-Leste",
            alternative: "TL"
        },

        {
            name: "Togo",
            alternative: "TG Togolese"
        },

        {
            name: "Tokelau",
            alternative: "TK"
        },

        {
            name: "Tonga",
            alternative: "TO"
        },

        {
            name: "Trinidad and Tobago",
            alternative: "TT"
        },

        {
            name: "Tunisia",
            alternative: "TN تونس"
        },

        {
            name: "Turkey",
            alternative: "TR Türkiye Turkiye"
        },

        {
            name: "Turkmenistan",
            alternative: "TM Türkmenistan"
        },

        {
            name: "Turks and Caicos Islands",
            alternative: "TC"
        },

        {
            name: "Tuvalu",
            alternative: "TV"
        },

        {
            name: "Uganda",
            alternative: "UG"
        },

        {
            name: "Ukraine",
            alternative: "UA Ukrayina Україна"
        },

        {
            name: "United Arab Emirates",
            alternative: "AE UAE الإمارات"
        },

        {
            name: "United Kingdom",
            alternative: "GB Great Britain England UK Wales Scotland Northern Ireland"

        },

        {
            name: "United States",
            alternative: "US USA United States of America"
        },

        {
            name: "United States Minor Outlying Islands",
            alternative: "UM"
        },

        {
            name: "Uruguay",
            alternative: "UY"
        },

        {
            name: "Uzbekistan",
            alternative: "UZ Ўзбекистон O'zbekstan O‘zbekiston"
        },

        {
            name: "Vanuatu",
            alternative: "VU"
        },

        {
            name: "Venezuela",
            alternative: "VE"
        },

        {
            name: "Vietnam",
            alternative: "VN Việt Nam"

        },

        {
            name: "Virgin Islands, British",
            alternative: "VG"
        },

        {
            name: "Virgin Islands, U.S.",
            alternative: "VI"
        },

        {
            name: "Wallis and Futuna",
            alternative: "WF"
        },

        {
            name: "Western Sahara",
            alternative: "EH لصحراء الغربية"
        },

        {
            name: "Yemen",
            alternative: "YE اليمن"
        },

        {
            name: "Zambia",
            alternative: "ZM"
        },

        {
            name: "Zimbabwe",
            alternative: "ZW"
        }
    ];

    return countries;
});