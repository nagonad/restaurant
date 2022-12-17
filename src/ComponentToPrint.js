import React from "react";
import { Table } from "reactstrap";

export default class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="px-2 print-source">
        <div>
          {this.props.checkoutInformation.delivery ? "Lieferung" : "Abholung"}
        </div>
        <div>{this.props.checkoutInformation.costumerName}</div>
        <div>{this.props.checkoutInformation.address}</div>
        <div>{this.props.checkoutInformation.phoneNumber}</div>

        <Table>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.orderNumber}>
                <th style={{ width: "10%" }}>{cartItem.quantity}x</th>
                <td>
                  <Table borderless className="m-0 p-0">
                    <tbody>
                      <tr>
                        <td className="p-0">
                          {cartItem.product.productId}{" "}
                          {cartItem.product.productName}
                          {cartItem.product.categoryId === "4" ||
                          cartItem.product.categoryId === "1" ? (
                            "-" + cartItem.productSize
                          ) : (
                            <></>
                          )}
                        </td>
                        <td className="text-end p-0">
                          {(
                            cartItem.quantity *
                            parseFloat(
                              cartItem.product.unitPrice[cartItem.productSize]
                            )
                          ).toFixed(2)}
                          €
                        </td>
                      </tr>
                      {cartItem.orderNote ? (
                        <tr>
                          <td className="p-0">{cartItem.orderNote}</td>
                          {cartItem.extraProductCost ? (
                            <td className="text-end p-0">
                              {cartItem.extraProductCost}€
                            </td>
                          ) : (
                            <></>
                          )}
                        </tr>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </Table>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>{this.props.cartItemQuantity} Artikel</div>
      </div>
    );
  }
}
