import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Tabs } from "antd";
import UsersSneakPeak from "./UsersSneakPeak";
import BandsSneakPeak from "./BandsSneakPeak";
import AdvertsSneakPeak from "./AdvertsSneakPeak";

export default class News extends Component {
  render() {
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }
    return (
      <Container>
        <Tabs onChange={callback} type="card">
          <TabPane tab="Adverts" key="1">
            <AdvertsSneakPeak />
          </TabPane>
          <TabPane tab="Users" key="2">
            <UsersSneakPeak />
          </TabPane>
          <TabPane tab="Bands" key="3">
            <BandsSneakPeak />
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
