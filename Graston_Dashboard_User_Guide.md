# Graston Technique Dashboard - User Guide

## Overview

This dashboard transforms raw, archived Graston Technique data from various relational tables into an intuitive, interactive, and searchable Excel dashboard. The dashboard serves as a single source of truth for all clinician-related data, eliminating the need for manual lookups across disparate spreadsheets and databases.

## Files Included

1. **Graston_Technique_Dashboard_v2.xlsx** - The main dashboard file with all data tables
2. **Graston_Dashboard_Enhancement_Guide.md** - Instructions for enhancing the dashboard with advanced Excel features
3. **create_dashboard_v2.py** - Python script used to generate the initial dashboard

## Getting Started

1. Open **Graston_Technique_Dashboard_v2.xlsx** in Microsoft Excel
2. Enable editing and content if prompted
3. The dashboard contains the following sheets:
   - User Dashboard: Main dashboard with user lookup
   - Customer Support View: View tailored for customer support team
   - Sales View: View tailored for sales team
   - Marketing View: View tailored for marketing team
   - Individual data tables (users, events, orders, etc.)

## Using the User Dashboard

1. Navigate to the "User Dashboard" sheet
2. In cell B3, select a user from the dropdown list
3. The dashboard will automatically populate with information about the selected user:
   - User Details (name, email, phone, etc.)
   - Licenses (with expiration dates)
   - Orders (with status and dates)
   - Event Registrations (with event names and dates)

## Enhancing the Dashboard

For the full interactive experience with dynamic lookups, conditional formatting, and slicers:

1. Review the **Graston_Dashboard_Enhancement_Guide.md** file
2. Follow the instructions to:
   - Set up table relationships
   - Implement XLOOKUP and FILTER functions
   - Add conditional formatting
   - Create slicers for data filtering

## Team-Specific Views

### Customer Support View

This view provides customer support representatives with all the information they need for a 360-degree view of a clinician:

- User Details: Full name, email, phone
- Licenses: License number, type, expiration date (with conditional formatting)
- Orders: Order ID, status, date, total price
- Shipments: Order ID, tracking number, shipment date

### Sales View

This view helps sales agents identify high-value customers and upsell opportunities:

- User Details: Name, email, phone, location
- Order History: Past purchases (instrument sets, modules)
- Event Registrations: Courses attended
- Preferred Provider Status: Quick visual flag

### Marketing View

This view provides crucial data for market segmentation and personalized campaigns:

- User Demographics: User type, location, primary business
- Event History: Types of events registered for
- Vouchers: Unused vouchers and expiration dates

## Testing the Dashboard

To test the dashboard functionality:

1. Open the Excel file
2. Select different users from the dropdown in the User Dashboard
3. Verify that the user details, licenses, orders, and event registrations update correctly
4. Test the team-specific views by navigating to each sheet
5. If you've implemented the enhancements from the guide:
   - Verify that conditional formatting works (expired licenses highlighted in red)
   - Test slicers for data filtering
   - Confirm that all lookup functions return correct data

## Troubleshooting

If you encounter issues:

1. Ensure all CSV files are in the "Table Data" folder
2. Check that table relationships are properly configured
3. Verify that formulas are correctly entered
4. Make sure you're using a compatible version of Excel (Excel 2016 or later recommended)

## Data Refresh

To update the dashboard with new data:

1. Replace the CSV files in the "Table Data" folder with updated versions
2. Run the Python script `create_dashboard_v2.py` to regenerate the dashboard
3. Or manually refresh the data in Excel if you've set up data connections

## Conclusion

This dashboard provides a powerful "single-pane-of-glass" view of each clinician's profile and history, enabling customer support, sales, and marketing teams to make faster, more informed decisions and provide a higher level of service to certified clinicians.
