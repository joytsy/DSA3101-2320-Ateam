import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerTable.css'; // Import CSS file
import { IconButton, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';

function CustomerTable() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        axios.get("/data")
            .then(res => {
                setData(res.data);
                setFilteredData(res.data.slice(0, 10)); // Slice to get first 10 rows
            })
            .catch(err => console.log(err));
    }, []);

    // Filter function
    const filterData = () => {
        const filtered = data.filter(user => {
            return selectedOptions.includes(user["Employment Status"]);
        });
        setFilteredData(filtered.slice(0, 10)); // Slice to get first 10 rows
        closeDropdown();
    };

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        const value = event.target.name;
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    // Toggle dropdown
    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close dropdown
    const closeDropdown = () => {
        setAnchorEl(null);
    };

    return (
        <div className='customer-table-container'>
            <div className='mt-3'>
                <h3>Customer Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Churn Prediction</th>
                            <th>
                                Employment Status
                                <IconButton aria-label="dropdown" onClick={toggleDropdown} className="white-button">
                                    <FilterListIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={closeDropdown}
                                >
                                    <MenuItem>
                                        {["Full-time", "Part-time", "Others"].map((option, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={selectedOptions.includes(option)}
                                                        onChange={handleCheckboxChange}
                                                        name={option}
                                                    />
                                                }
                                                label={option}
                                            />
                                        ))}
                                    </MenuItem>
                                    <MenuItem onClick={filterData}>Apply</MenuItem>
                                </Menu>
                            </th>
                            <th>Housing Status</th>
                            <th>Credit Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.customer_id}</td>
                                <td>{user.churn}</td> 
                                <td>{user["Employment Status"]}</td>
                                <td>{user["Housing Status"]}</td>
                                <td>{user.credit_score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerTable;
