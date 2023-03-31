import { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import heroImageMobile from "../assets/pattern-bg-mobile.png";
import heroImageDesktop from "../assets/pattern-bg-desktop.png";
import iconLocation from "../assets/icon-location.svg";
import L from "leaflet";

const zoom = 16;

function DisplayPosition({ map, setCenter }) {
  const [ipAddressSearch, setIpAddressSearch] = useState();
  const [, setPosition] = useState(() => map.getCenter());
  const [ipAddress, setIpAddress] = useState("Loading...");
  const [location, setLocation] = useState("Loading...");
  const [timezone, setTimezone] = useState("Loading...");
  const [isp, setIsp] = useState("Loading...");

  // get user ip address for first url access
  useEffect(() => {
    fetch("https://api.ipify.org")
      .then((response) => response.text())
      .then((data) => {
        setIpAddress(data);
        setIpAddressSearch(data);
        console.log(data);

        fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${data}`
        )
          .then((response) => response.json())
          .then((data) => {
            setLocation(data.location.region, data.location.city);
            setTimezone("UTC " + data.location.timezone);
            setIsp(data.isp);

            const newCenter = [data.location.lat, data.location.lng];
            setCenter(newCenter);
            map.setView(newCenter, zoom);
          })
          .catch((error) => {
            setIpAddress("Invalid IP Address");
            setLocation("-");
            setTimezone("-");
            setIsp("-");
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  }, [map, setCenter]);

  const onClick = useCallback(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ipAddressSearch}`
    )
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);
        setLocation(data.location.region, data.location.city);
        setTimezone("UTC " + data.location.timezone);
        setIsp(data.isp);

        const newCenter = [data.location.lat, data.location.lng];
        setCenter(newCenter);
        map.setView(newCenter, zoom);
      })
      .catch((error) => {
        setIpAddress("Invalid IP Address");
        setLocation("-");
        setTimezone("-");
        setIsp("-");
        console.error(error);
      });
  }, [ipAddressSearch, map, setCenter]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <>
      <section className="fixed top-0 left-0 right-0 flex flex-col items-center gap-6 my-6 mx-auto md:gap-14">
        <h1 className="text-2xl font-medium text-white">IP Address Tracker</h1>
        <div className="flex items-center justify-center w-[85%]">
          <input
            className="w-[100%] h-14 rounded-l-xl px-6 text-body md:w-[40%]"
            type="text"
            value={ipAddressSearch}
            onChange={(event) => {
              setIpAddressSearch(event.target.value);
            }}
            placeholder="Search for any IP address or domain"
          />
          <button
            className="h-14 px-6 bg-black border border-black text-white font-bold rounded-r-xl hover:bg-very-dark-gray hover:border-very-dark-gray"
            onClick={onClick}
          >
            {">"}
          </button>
        </div>
        <div className="flex flex-col justify-between gap-5 w-[85%] py-6 rounded-xl bg-white text-center md:flex-row md:text-left md:w-[75%] md:px-8">
          <div className="flex flex-col flex-1 md:gap-2">
            <h2 className="text-dark-gray text-xs font-medium">IP ADDRESS</h2>
            <p className="text-very-dark-gray text-body font-medium md:text-2xl">
              {ipAddress}
            </p>
          </div>
          <div className="border-l-2 border-dark-gray hidden md:flex" />
          <div className="flex flex-col flex-1 md:gap-2">
            <h2 className="text-dark-gray text-xs font-medium">LOCATION</h2>
            <p className="text-very-dark-gray text-body font-medium md:text-2xl">
              {location}
            </p>
          </div>
          <div className="border-l-2 border-dark-gray hidden md:flex" />
          <div className="flex flex-col flex-1 md:gap-2">
            <h2 className="text-dark-gray text-xs font-medium">TIMEZONE</h2>
            <p className="text-very-dark-gray text-body font-medium md:text-2xl">
              {timezone}
            </p>
          </div>
          <div className="border-l-2 border-dark-gray hidden md:flex" />
          <div className="flex flex-col flex-1 md:gap-2">
            <h2 className="text-dark-gray text-xs font-medium">ISP</h2>
            <p className="text-very-dark-gray text-body font-medium md:text-2xl">
              {isp}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Map() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([0, 0]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={true}
        ref={setMap}
        style={{ height: "calc(100vh - 300px)", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={center}
          icon={L.icon({
            iconUrl: iconLocation,
            iconSize: [45, 60],
            iconAnchor: [14, 15],
          })}
        ></Marker>
      </MapContainer>
    ),
    [center]
  );
  return (
    <>
      <main className="h-max-[100vh]">
        <img
          src={heroImageMobile}
          alt="hero mobile"
          className="h-[300px] w-[100%] md:hidden"
        />
        <img
          src={heroImageDesktop}
          alt="hero desktop"
          className="h-[300px] w-[100%] hidden md:flex"
        />
        {displayMap}
        {map ? <DisplayPosition map={map} setCenter={setCenter} /> : null}
      </main>
    </>
  );
}
