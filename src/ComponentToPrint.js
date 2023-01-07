import React from "react";
import { Table, Col, Row } from "reactstrap";

export default class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="px-3 print-source mt-2">
        <div style={{ marginBottom: "40px" }}>
          <div>
            <div>BISSULA</div>
            <div>Döner und Pizza Haus</div>
          </div>
          <hr className="m-1" />
          <Row>
            <Col>
              <div>{this.props.dateTime}</div>
            </Col>
            <Col>
              <h5 className="text-end">
                <b>
                  {this.props.checkoutInformation.delivery
                    ? "Lieferung"
                    : "Abholung"}
                </b>
              </h5>
            </Col>
          </Row>

          <div>{this.props.checkoutInformation.costumerName}</div>
          <div>{this.props.checkoutInformation.address}</div>
          <div>{this.props.checkoutInformation.phoneNumber}</div>
          {this.props.checkoutInformation.checkoutNote
            ? "** " + this.props.checkoutInformation.checkoutNote + " **"
            : null}
          <hr className="m-1" />
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
          <>
            <div>{this.props.cartItemQuantity} Artikel</div>
            {this.props.checkoutInformation.delivery ? (
              <Row className="d-flex flex-row">
                <Col>Lieferpesen</Col>
                <Col className="d-flex flex-row text-end">
                  <p
                    style={{
                      fontSize: "0.7em",
                      marginBottom: "0",
                      alignSelf: "end",
                    }}
                  >
                    inkl.19%MwSt(
                    {(
                      this.props.locations[
                        this.props.checkoutInformation.deliveryTarget
                      ] * 0.19
                    ).toFixed(2)}
                    )
                  </p>
                  {this.props.locations[
                    this.props.checkoutInformation.deliveryTarget
                  ].toFixed(2)}
                  €
                </Col>
              </Row>
            ) : null}
          </>
          <>
            {this.props.checkoutInformation.delivery ? (
              <Row className="d-flex flex-row">
                <Col>Speisen</Col>
                <Col className="d-flex flex-row text-end">
                  <p
                    style={{
                      fontSize: "0.7em",
                      marginBottom: "0",
                      alignSelf: "end",
                    }}
                  >
                    inkl.7%MwSt(
                    {(
                      (this.props.checkoutInformation.delivery
                        ? this.props.totalCost -
                          this.props.locations[
                            this.props.checkoutInformation.deliveryTarget
                          ]
                        : this.props.totalCost) * 0.07
                    ).toFixed(2)}
                    )
                  </p>
                  {(this.props.checkoutInformation.delivery
                    ? this.props.totalCost -
                      this.props.locations[
                        this.props.checkoutInformation.deliveryTarget
                      ]
                    : this.props.totalCost
                  ).toFixed(2)}
                  €
                </Col>
              </Row>
            ) : null}
          </>
          <>
            <Row className="d-flex flex-row">
              <Col>Gesamtpreis</Col>
              <Col className="d-flex flex-row text-end">
                <p
                  style={{
                    fontSize: "0.7em",
                    marginBottom: "0",
                    alignSelf: "end",
                  }}
                >
                  inkl.MwSt(
                  {(
                    (this.props.checkoutInformation.delivery
                      ? this.props.totalCost -
                        this.props.locations[
                          this.props.checkoutInformation.deliveryTarget
                        ]
                      : this.props.totalCost) *
                      0.07 +
                    (this.props.checkoutInformation.delivery
                      ? this.props.locations[
                          this.props.checkoutInformation.deliveryTarget
                        ]
                      : 0) *
                      0.19
                  ).toFixed(2)}
                  )
                </p>
                {this.props.totalCost.toFixed(2)}€
              </Col>
            </Row>
          </>
        </div>
        <hr />
      </div>
    );
  }
}
