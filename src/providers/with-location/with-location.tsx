import StoreLocation from "@providers/with-location/StoreLocation";

async function getBranches() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/branch`, { cache: 'no-store'});
    return response.json();
}

const WithLocation = async () => {
    const branches = await getBranches();

    return <StoreLocation branches={branches} />
};

export default WithLocation;