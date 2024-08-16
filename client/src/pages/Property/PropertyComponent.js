import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import httpCommon from "../../http-common";
import Container from "../../component/Container";
import SearchForm from "../../component/search/search";
import Card from "../../component/card/card";
import Social from "../../component/Social";
import { FaSellsy } from "react-icons/fa6";
import { MdAddHome } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";
import Loader from "../../component/Loader/Loader";


function PropertyComponent({ defaultType }) {
    const [allProperties, setAllProperties] = useState([]);
    const [originalProperties, setOriginalProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch properties from the API
    const fetchAllProperties = async (filterParams = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpCommon.get(`/list`, {
                params: filterParams,
            });

            // console.log(response, "response____AllProperties");

            if (response.data.status === "success") {
                const properties = response.data.data;
                setOriginalProperties(properties);
                setAllProperties(properties);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch properties. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle filter changes
    const handleFilterChange = (formData) => {
        if (!formData || Object.keys(formData).length === 0) {
            setAllProperties(originalProperties);
            return;
        }

        let filteredProperties = originalProperties || [];

        if (filteredProperties.length === 0) {
            setAllProperties(filteredProperties);
            return;
        }

        if (formData.search) {
            filteredProperties = filteredProperties.filter((item) =>
                item.ltg_regions?.toLowerCase().includes(formData.search.toLowerCase()) ||
                item.ltg_categories?.toLowerCase().includes(formData.search.toLowerCase())
            );
        }

        if (formData.city && formData.city !== 'any') {
            filteredProperties = filteredProperties.filter((item) => {
                return item.ltg_regions?.toLowerCase() === formData.city.toLowerCase();
            });
        }

        if (formData.type && formData.type !== 'any') {
            filteredProperties = filteredProperties.filter((item) => {
                return item.ltg_categories?.toLowerCase() === formData.type?.toLowerCase();
            }
            );
        }

        const selectedProperty = formData.property || defaultType;

        if (formData.property && formData.property !== 'any') {
            filteredProperties = filteredProperties.filter((item) =>
                item.ltg_type === selectedProperty
            );
        }

        if (formData.price && (formData.price.min !== undefined || formData.price.max !== undefined)) {
            const minPrice = formData.price.min !== undefined ? formData.price.min : "";
            const maxPrice = formData.price.max !== undefined ? formData.price.max : "";

            filteredProperties = filteredProperties.filter((item) => {
                let salePrice = parseInt(getSalePrice(item), 10);
                return (
                    (minPrice === "" || salePrice >= minPrice) &&
                    (maxPrice === "" || salePrice <= maxPrice)
                );
            });
        }

        if (formData.area && (formData.area.min !== undefined || formData.area.max !== undefined)) {
            const minArea = formData.area.min !== undefined ? formData.area.min : "";
            const maxArea = formData.area.max !== undefined ? formData.area.max : "";

            filteredProperties = filteredProperties.filter((item) => {
                const area = parseInt(getArea(item), 10);
                return (
                    (minArea === "" || area >= minArea) &&
                    (maxArea === "" || area <= maxArea)
                );
            });
        }

        if (formData.bedRooms) {
            filteredProperties = filteredProperties.filter((item) => {
                const bedrooms = parseInt(getBedrooms(item), 10);
                return bedrooms >= parseInt(formData.bedRooms, 10);
            });
        }

        if (formData.bathRooms) {
            filteredProperties = filteredProperties.filter((item) => {
                const bathrooms = parseInt(getBathrooms(item), 10);
                return bathrooms >= parseInt(formData.bathRooms, 10);
            });
        }

        if (formData.status && formData.status !== 'any') {
            filteredProperties = filteredProperties.filter((item) => {
                const status = getStatus(item);
                return status?.toLowerCase() === formData.status?.toLowerCase();
            });
        }

        if (formData.amenities && formData.amenities.length > 0) {
            filteredProperties = filteredProperties.filter((item) => {
                const amenities = getAmenities(item);
                return formData.amenities.every((amenity) => amenities.includes(amenity));
            });
        }

        setAllProperties(filteredProperties);
    };

    const getSalePrice = (item) => {
        switch (item.ltg_type) {
            case "CommercialProperties":
                return item.ltg_det_comm_prop_sale_price;
            case "PentHouses":
                return item.ltg_det_penthouses_sale_price;
            case "RowHouses":
                return item.ltg_det_row_house_sale_price;
            case "Plots":
                return item.ltg_det_plot_sale_price;
            case "Villaments":
                return item.ltg_det_villaments_sale_price;
            default:
                return item.ltg_det_sale_price;
        }
    };

    const getArea = (item) => {
        switch (item.ltg_type) {
            case "CommercialProperties":
                return item.ltg_det_comm_prop_pmts_area_dts?.match(/(\d+)/)?.[0];
            case "PentHouses":
                return item.ltg_det_penthouses_pmts_area_dts?.match(/(\d+)/)?.[0];
            case "RowHouses":
                return item.ltg_det_row_house_pmts_area_dts?.match(/(\d+)/)?.[0];
            case "Plots":
                return item.ltg_det_plot_pmts_area_dts?.match(/(\d+)/)?.[0];
            case "Villaments":
                return item.ltg_det_villaments_pmts_area_dts?.match(/(\d+)/)?.[0];
            default:
                return item.ltg_det_pmts_area_dts?.match(/(\d+)/)?.[0];
        }
    };

    const getBedrooms = (item) => {
        switch (item.ltg_type) {
            case "PentHouses":
                return item.ltg_det_penthouses_pmts_bed_rooms;
            case "RowHouses":
                return item.ltg_det_row_house_pmts_bed_rooms;
            case "Villaments":
                return item.ltg_det_villaments_pmts_bed_rooms;
            default:
                return item.ltg_det_pmts_bed_rom;
        }
    };

    const getBathrooms = (item) => {
        switch (item.ltg_type) {
            case "PentHouses":
                return item.ltg_det_penthouses_pmts_bath_rooms;
            case "RowHouses":
                return item.ltg_det_row_house_pmts_bath_rooms;
            case "Villaments":
                return item.ltg_det_villaments_pmts_bath_rooms;
            default:
                return item.ltg_det_pmts_bth_rom;
        }
    };

    const getStatus = (item) => {
        switch (item.ltg_type) {
            case "CommercialProperties":
                return item.ltg_det_comm_prop_pmts_status;
            case "PentHouses":
                return item.ltg_det_penthouses_pmts_status;
            case "RowHouses":
                return item.ltg_det_row_house_pmts_status;
            case "Plots":
                return item.ltg_det_plot_pmts_status;
            case "Villaments":
                return item.ltg_det_villaments_pmts_status;
            default:
                return item.ltg_det_pmts_status;
        }
    };

    const getAmenities = (item) => {
        switch (item.ltg_type) {
            case "CommercialProperties":
                return item.ltg_det_comm_prop_amenities?.split(', ').map((amenity) => amenity.trim());
            case "PentHouses":
                return item.ltg_det_penthouses_amenities?.split(', ').map((amenity) => amenity.trim());
            case "RowHouses":
                return item.ltg_det_row_house_amenities?.split(', ').map((amenity) => amenity.trim());
            case "Plots":
                return item.ltg_det_plot_amenities?.split(', ').map((amenity) => amenity.trim());
            case "Villaments":
                return item.ltg_det_villaments_amenities?.split(', ').map((amenity) => amenity.trim());
            default:
                return item.ltg_det_amenities?.split(', ').map((amenity) => amenity.trim());
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (defaultType !== "") {
                fetchAllProperties();
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [defaultType]);

    useEffect(() => {
        if (originalProperties.length > 0) {
            handleFilterChange({ property: defaultType });
        }
    }, [originalProperties, defaultType]);

    return (
        <>
            <Container>
                <SearchForm
                    onFilterChange={handleFilterChange}
                    defaultProperty={defaultType}
                />
                {loading ? <Loader /> : (
                    allProperties.map((item) => (
                        <Card key={item.id} item={item} />
                    ))
                )}
            </Container>

            <section className="footerPatner  bg-[#1C1C1E] ">
                <Container
                    className={
                        "md:py-20 flex flex-col md:flex-row items-center justify-between"
                    }
                >
                    <div className="w-full left md:w-1/2 md:pr-10">
                        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                            More than 10 Years of Experience
                        </h2>
                        <hr className="w-20 h-1 mb-4 bg-blue-800" />
                        <p className="text-white">
                            It’s not what we do, but how we do it that sets us apart. Get in
                            touch with us today to experience our holistic services that will
                            put you a step closer to your dream home.
                        </p>
                    </div>
                    <div className="grid w-full grid-cols-1 mt-10 right md:w-1/2 md:grid-cols-2 gap-7 md:mt-0">
                        <div className="flex items-center gap-5 1">
                            <FaSellsy className="text-blue-700" size={42} />
                            <div>
                                <h2 className="text-white price">2,000 +</h2>
                                <p className="text-white description">Properties Sold</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 2">
                            <MdAddHome className="text-blue-700" size={42} />
                            <div>
                                <h2 className="text-white price">80 +</h2>
                                <p className="text-white description">Projects Handled</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 3">
                            <IoMdHappy className="text-blue-700" size={42} />
                            <div>
                                <h2 className="text-white price">400 +</h2>
                                <p className="text-white description">NRI Clientele Served</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 3">
                            <FaRegHandshake className="text-blue-700" size={42} />
                            <div>
                                <h2 className="text-white price">150 +</h2>
                                <p className="text-white description">Satisfied Builders</p>
                            </div>
                        </div>
                    </div>
                </Container>

                <hr className="" />
            </section>
            <Social />
        </>
    );
}

export default PropertyComponent;
