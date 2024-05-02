import axios from "axios";
import { useEffect, useState } from "react";
import "../style/style.css";
import SearchBar from "../components/searchbar";
import Modal from "../components/modal";

// Country data type
interface Country {
  code: string;
  name: string;
  capital: string;
  emoji: string;
  continent: { name: string };
  currency: string;
  languages: { name: string }[];
  native: string;
  phone: string;
  awsRegion: string;
}

// Country box component
const CountryBox = ({
  country,
  onClick,
}: {
  country: Country;
  onClick: () => void;
}) => (
  <div className="country-box" onClick={onClick}>
    <div className="emoji">{country.emoji}</div>
    <p className="name">{country.name}</p>
    <div className="info">
      <div className="detail">
        <p className="title">Capita</p>
        <p>{country.capital}</p>
      </div>
      <div className="detail">
        <p className="title">Currency</p>
        <p>{country.currency}</p>
      </div>
    </div>
  </div>
);

// Modal Detail Component
const ModalDetail = ({ title, value }: { title: string; value: any }) => (
  <div className="modal-detail">
    <p className="detail-title">{title}</p>
    <p>{value}</p>
  </div>
);

// Main Component
export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string | undefined>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(0);
  const apiUrl = "https://countries.trevorblades.com/";

  // Get data from API
  const getData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        query: `
                query {
                  countries {
                    code
                    name
                    capital
                    continent {
                      name
                    }
                    currencies
                    currency
                    emoji
                    emojiU
                    languages {
                      name
                    }
                    native
                    phone
                    phones
                    awsRegion
                    states {
                      name
                    }
                    subdivisions {
                      name
                    }
                  }
                }
              `,
      });
      console.log(response.data.data.countries);
      setCountries(response.data.data.countries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Search feature
  useEffect(() => {
    if (search != undefined && search != "") {
      const filtered = countries.filter((item: any) =>
        Object.values(item).some((value: any) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [countries, search]);

  return (
    <>
      {countries && (
        <>
          <Modal
            visible={showModal}
            onClose={() => setShowModal(false)}
            children={
              <div>
                <p className="modal-title">Detail Information</p>
                <div className="modal-grid">
                  {filteredCountries[selectedCountryIndex] && (
                    <>
                      <ModalDetail
                        title="Code"
                        value={filteredCountries[selectedCountryIndex].code}
                      />
                      <ModalDetail
                        title="Name"
                        value={filteredCountries[selectedCountryIndex].name}
                      />
                      <ModalDetail
                        title="Capital"
                        value={filteredCountries[selectedCountryIndex].capital}
                      />
                      <ModalDetail
                        title="Continent"
                        value={
                          filteredCountries[selectedCountryIndex].continent.name
                        }
                      />
                      <ModalDetail
                        title="Currency"
                        value={filteredCountries[selectedCountryIndex].currency}
                      />
                      <ModalDetail
                        title="Languages"
                        value={filteredCountries[
                          selectedCountryIndex
                        ]?.languages
                          .map((lang: any) => lang.name)
                          .join(", ")}
                      />
                      <ModalDetail
                        title="Native"
                        value={filteredCountries[selectedCountryIndex].native}
                      />
                      <ModalDetail
                        title="Phone"
                        value={filteredCountries[selectedCountryIndex].phone}
                      />
                      <ModalDetail
                        title="AwsRegion"
                        value={
                          filteredCountries[selectedCountryIndex].awsRegion
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            }
          />
          <div className="page">
            <div className="header">
              <p>List of Countries</p>
              <SearchBar
                value={search}
                placeholder={"Search country"}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="country-grid">
              {filteredCountries.map((country, idx) => (
               <CountryBox
               key={country.code}
               country={country}
               onClick={() => {
                 setShowModal(true);
                 setSelectedCountryIndex(idx);
               }}
             />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
