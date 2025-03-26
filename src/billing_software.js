import { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from './ItemContext';
import { Link } from 'react-router-dom';
function BillingSoftware() {
    const navigate = useNavigate();
    const [todayDate, setTodayDate] = useState('');
    const { items } = useContext(ItemContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTodayDate(new Date().toISOString().split('T')[0]);
        const savedData = JSON.parse(localStorage.getItem('billingData')) || {};
        setTableData(savedData.tableData || []);
        setTotal(savedData.total || 0);
    }, []);

    useEffect(() => {
        const newTotal = tableData.reduce((sum, row) => sum + parseFloat(row.totalprice), 0);
        setTotal(newTotal.toFixed(2));
        localStorage.setItem('billingData', JSON.stringify({ tableData, total: newTotal }));
    }, [tableData]);

    function add() {

        if (!selectedItem || quantity <= 0 || quantity > 1000) {
            alert('Please select Item and Quantity between 1 and 1000');
            return;
        }
        const gstAmount = (selectedItem.cost * selectedItem.gst / 100) * quantity;
        const totalprice = (selectedItem.cost * quantity) + gstAmount;
        const newRow = {
            id: tableData.length + 1,
            itemName: selectedItem.item,
            quantity: quantity,
            rate: selectedItem.cost,
            gstrate: selectedItem.gst,
            gstAmount: gstAmount.toFixed(2),
            totalprice: totalprice.toFixed(2)
        };

        setTableData([...tableData, newRow]);
        setSelectedItem(null);
        setQuantity('');
    }

    function removeRow(index) {
        const updatedTable = tableData.filter((_, i) => i !== index);
        setTableData(updatedTable);
    }
    function handlePrint() {

        if (tableData.length > 0) {
            const confirmPayment = window.confirm("Have you received the UPI payment to 9585211433?");
            if (confirmPayment) {
                navigate('/invoice', { state: { tableData, total } });
            } else {
                alert("Print operation cancelled. Please confirm payment first.");
            }
        }
        else {
            alert('Select the item')
        }

    }
    function clearBillingData() {
        setTableData([]);
        setTotal(0);
        localStorage.removeItem('billingData');
    }
    return (
        <><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Billing Software</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            <h1 style={{ color: 'brown' }}>Customer - Freight Link</h1>
            <div className="container mt-4">
                <div className="card">
                    <div className="cardBody">
                        <div style={{ padding: '25px' }}>
                            <div className="col-6">
                                <label>Date</label>
                                <input type="date" className="form-control" value={todayDate} readOnly />
                            </div>
                            <div className='col-6 mt-4'>
                                <label>Item Name</label>
                                <input
                                    list="items-list"
                                    className="form-control"
                                    value={selectedItem ? selectedItem.item : ''}
                                    onChange={(e) => {
                                        const selected = items.find(item => item.item === e.target.value);
                                        setSelectedItem(selected || null);
                                    }}
                                    placeholder="Type or select an item..."
                                />
                                <datalist id="items-list">
                                    {items.map((item, index) => (
                                        <option key={index} value={item.item} />
                                    ))}
                                </datalist>
                            </div>

                            <div className='col-6 mt-4'>
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </div>

                            <div className='mt-4'>
                                <button onClick={add} className='btn btn-primary'>Add</button>
                                <button onClick={handlePrint} className='btn btn-success ms-2'>Print</button>
                                <button onClick={clearBillingData} className='btn btn-danger ms-2'>Clear</button>
                            </div>

                            <div className='table-responsive mt-4'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>GST Rate</th>
                                            <th>GST Amount</th>
                                            <th>Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.itemName}</td>
                                                <td>{row.quantity}</td>
                                                <td>{row.rate}</td>
                                                <td>{row.gstrate}</td>
                                                <td>{row.gstAmount}</td>
                                                <td>{row.totalprice}</td>
                                                <td><button className='btn btn-danger' onClick={() => removeRow(index)}>Remove</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='col-3 d-flex'>
                                    <label className='mt-2' style={{ marginRight: '5px' }}>Total</label>
                                    <input type='number' className='form-control' value={total} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BillingSoftware;
