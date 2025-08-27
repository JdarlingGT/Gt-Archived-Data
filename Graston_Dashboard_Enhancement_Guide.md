# Graston Technique Dashboard Enhancement Guide

This guide explains how to enhance the Graston Technique Dashboard created by the Python script with advanced Excel features like lookup functions, relationships, conditional formatting, and slicers.

## Table of Contents
1. [Setting up Table Relationships](#setting-up-table-relationships)
2. [Implementing Lookup Functions](#implementing-lookup-functions)
3. [Adding Conditional Formatting](#adding-conditional-formatting)
4. [Creating Slicers](#creating-slicers)
5. [Team-Specific Views](#team-specific-views)

## Setting up Table Relationships

The dashboard already includes named tables for each data source. To set up relationships between these tables:

1. Open the Excel file
2. Go to the "Data" tab
3. Click on "Relationships" in the "Data Tools" group
4. Click "New" to create a new relationship
5. Set up the following relationships:
   - Users.id → Events.instructor_id
   - Users.id → Event_Registrations.user_id
   - Users.id → Orders.user_id
   - Users.id → Licenses.user_id
   - Users.id → Vouchers.user_id
   - Events.id → Event_Registrations.event_id
   - Orders.id → Shipments.order_id
   - Orders.id → Instrument_Sets.order_id
   - Addresses.id → Orders.billing_address_id
   - Addresses.id → Orders.shipping_address_id

## Implementing Lookup Functions

### User Dashboard Lookup Engine

In the User Dashboard sheet, replace the placeholder cells with actual lookup formulas:

1. **Selected User ID (Cell B30)**:
   ```
   =INDEX(users[ID], MATCH(B3, users[first_name]&" "&users[last_name], 0))
   ```

2. **User Details Section**:
   - A7 (Full Name): `=IF(B3<>"Select a user", B3, "")`
   - B7 (Email): `=IF(B3<>"Select a user", INDEX(users[email], MATCH(B3, users[first_name]&" "&users[last_name], 0)), "")`
   - C7 (Phone): `=IF(B3<>"Select a user", INDEX(users[phone_number], MATCH(B3, users[first_name]&" "&users[last_name], 0)), "")`
   - D7 (Type): `=IF(B3<>"Select a user", INDEX(users[type], MATCH(B3, users[first_name]&" "&users[last_name], 0)), "")`
   - E7 (Last Login): `=IF(B3<>"Select a user", INDEX(users[last_login], MATCH(B3, users[first_name]&" "&users[last_name], 0)), "")`

3. **Licenses Section**:
   - For multiple licenses, use the FILTER function (Excel 365/2021):
     ```
     =FILTER(licenses, licenses[user_id]=B30)
     ```
   - For older Excel versions, use INDEX/AGGREGATE:
     ```
     =IF(B3<>"Select a user", INDEX(licenses[number], AGGREGATE(15, 6, (ROW(licenses[user_id])-ROW(licenses[#Headers]))/(licenses[user_id]=B30), ROW(A1))), "")
     ```

4. **Orders Section**:
   - For multiple orders, use the FILTER function:
     ```
     =FILTER(orders, orders[user_id]=B30)
     ```

5. **Event Registrations Section**:
   - For multiple registrations, use the FILTER function:
     ```
     =FILTER(event_registrations, event_registrations[user_id]=B30)
     ```

## Adding Conditional Formatting

To add visual enhancements to the dashboard:

1. **License Expiration Highlighting**:
   - Select the expiration date cells in the Licenses section
   - Go to "Home" → "Conditional Formatting" → "New Rule"
   - Choose "Format only cells that contain"
   - Set the rule to format cells where the date is less than today's date
   - Choose a red fill color

2. **Pending Orders Highlighting**:
   - Select the order status cells
   - Create a new conditional formatting rule
   - Format cells that contain "pending" with a yellow fill color

3. **Preferred Provider Status**:
   - Select the preferred provider cells
   - Create a rule to format cells that contain "true" with a green fill and checkmark

## Creating Slicers

To add slicers for data filtering:

1. Select any cell in a data table
2. Go to the "Insert" tab
3. Click on "Slicer" in the "Filters" group
4. Select the columns you want to use for filtering (e.g., event type, order status)
5. Click "OK"
6. Position and format the slicers as needed

## Team-Specific Views

### Customer Support View

The Customer Support view should include:

1. **User Details**:
   - Full name, email, phone
   - License information with expiration dates (highlighted if expired)

2. **Order History**:
   - Order ID, status, date, total price
   - Highlight pending orders

3. **Shipment Information**:
   - Order ID, tracking number, shipment date

### Sales View

The Sales view should include:

1. **User Details**:
   - Name, email, phone, location
   - Preferred provider status

2. **Order History**:
   - Past purchases (instrument sets, modules)
   - Total spending

3. **Event Registrations**:
   - Courses attended
   - Registration dates

### Marketing View

The Marketing view should include:

1. **User Demographics**:
   - User type (clinician, etc.)
   - Location and primary business

2. **Event History**:
   - Types of events registered for (live, virtual, self-paced)

3. **Voucher Status**:
   - Unused vouchers
   - Expiration dates

## Additional Enhancements

1. **Data Validation**:
   - The user dropdown is already set up in cell B3 of the User Dashboard
   - You can add additional validation for other input fields as needed

2. **Pivot Tables**:
   - Create pivot tables for summary views of:
     - Event attendance by type
     - Revenue by product category
     - License expiration tracking

3. **Charts**:
   - Add charts to visualize:
     - Event registration trends
     - Revenue by month
     - Geographic distribution of users

4. **Macros**:
   - For advanced automation, consider adding VBA macros to:
     - Automatically refresh data
     - Send alerts for expiring licenses
     - Generate reports

## Conclusion

This dashboard provides a solid foundation for managing Graston Technique clinician data. By implementing the enhancements described in this guide, you'll create a powerful, interactive tool that enables customer support, sales, and marketing teams to access the information they need quickly and efficiently.

The key to success with this dashboard is maintaining data quality and regularly updating the underlying CSV files to ensure all information is current.