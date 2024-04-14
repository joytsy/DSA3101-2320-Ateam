import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import './interactive.css';

function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <div class="formdiv">
      <form onSubmit={handleSubmit}>

        <fieldset>
          <legend>Churn Prediction</legend>

          {/* Gender */}
          <label>Select gender
            <br />
            <input required
              type="radio"
              name="gender"
              value={"Female" || ""}
              onChange={handleChange}
            />
            <label class="option"> Female </label>
            <input
              type="radio"
              name="gender"
              value={"Male" || ""}
              onChange={handleChange}
            /> Male
          </label>

          <br />

        </fieldset>
        <fieldset>
          {/* Country */}
          <label>Country of Residence
            <br />
            <input required
              class="textbox"
              type="text"
              name="country"
              value={inputs.country || ""}
              onChange={handleChange}
            />
          </label>

          <br />

        </fieldset>
        <fieldset>

          {/* Age */}
          <label>Customer's Age
            <br />
            <input required
              type="number"
              name="age"
              min="1"
              max="100"
              value={inputs.age || ""}
              onChange={handleChange}
            />
          </label>

          <br />

          {/* Tenure */}
          <label>Tenure (Number of years he/she has a bank account in the bank)
            <br />
            <input required
              type="number"
              name="tenure"
              min="0"
              max="100"
              value={inputs.tenure || ""}
              onChange={handleChange}
            />
          </label>

          <br />

          {/* Account Balance */}
          <label>Account Balance
            <br />
            <input required
              type="number"
              name="account_balance"
              min="0"
              value={inputs.account_balance || ""}
              onChange={handleChange}
            />
          </label>

          <br />

          {/* Credit Score */}
          <label>Credit Score
            <br />
            <input required
              type="number"
              name="credit_score"
              min="0"
              value={inputs.credit_score || ""}
              onChange={handleChange}
            />
          </label>

          <br />

          {/* Products Count */}
          <label>Number of products from bank
            <br />
            <input required
              type="number"
              name="products_count"
              min="0"
              value={inputs.products_count || ""}
              onChange={handleChange}
            />
          </label>

          <br />

        </fieldset>
        <fieldset>

          {/* Active Member */}
          <label> Is he/she an active member of the bank?
            <br />
            <input required
              type="radio"
              name="active"
              value={"Yes" || ""}
              onChange={handleChange}
            />
            <label class="option"> Yes </label>

            <input
              type="radio"
              name="active"
              value={"No" || ""}
              onChange={handleChange}
            /> No

          </label>

          <br />

          {/* Has Credit Card */}
          <label> Does he/she has a credit card?
            <br />
            <input required
              type="radio"
              name="credit_card"
              value={"Yes" || ""}
              onChange={handleChange}
            />

            <label class="option"> Yes </label>

            <input
              type="radio"
              name="credit_card"
              value={"No" || ""}
              onChange={handleChange}
            /> No

          </label>

          <br/>


          <input type="submit" value="Predict" />
        </fieldset>
      </form>
    </div>
  )
}

export default MyForm;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
