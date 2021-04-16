import React, { useState, useEffect, useContext } from "react";
import {
  RefreshControl,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import * as theme from "../../constants/theme.js";
import { Block, Text, Empty } from "../../components/Index.js";
import axios from "axios";
import { UserContext } from "../../context/UserContext.js";
import { ridersUrl } from "../../constants/url.js";


export default LeaderBoard = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [riders, setRiders] = useState();

  const context = useContext(UserContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getRidersData();
    setRefreshing(false);
  });

  const getRidersData = async () => {
    try {
      await axios({
        method: "GET",
        url: ridersUrl,
      }).then(function (response) {
        const newRidersSortedData = response.data.sort(function (a, b) {
          return parseInt(b.walletBalance) - parseInt(a.walletBalance);
        });
        setRiders(newRidersSortedData);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getRidersData();
    return () => {
      source.cancel();
    };
  }, [riders]);

  const WalletBalance = () => {
    return (
      <Block style={{ paddingHorizontal: 15, marginTop: 10, marginBottom: 5 }}>
        <Block
          center
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 5,
            borderRadius: 5,
            backgroundColor: theme.colors.black,
          }}
        >
          <Text bold color={theme.colors.white} style={{fontSize:24}}>
           Total earning{" "}
          </Text>
          <Text  bold color={theme.colors.white} style={{fontSize:24}}>
          {'\u20B9'} {context.user.walletBalance}
          </Text>
        </Block>
        <Block style={{ paddingVertical: 5 }}>
          <Text bold style={{ fontSize: 20 }}>
            Top riders earning
          </Text>
        </Block>
      </Block>
    );
  };

  const Item = ({ fullName, walletBalance }) => {
    return (
      <Block style={{ paddingHorizontal: 15 }}>
        <Block
          row
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.white,
          }}
        >
          <Block
            row
            center
            style={{
              alignItems: "flex-start",
            }}
          >
            <Image
              source={require("../../assets/icons/user.png")}
              style={{ height: 20, width: 20, marginRight: 10 }}
            />
            <Text h4>{fullName}</Text>
          </Block>
          <Block
            center
            middle
            style={{
              alignItems: "flex-end",
            }}
          >
            <Text h4>{'\u20B9'} {walletBalance}</Text>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Block center middle>
          <ActivityIndicator size="large" color={theme.colors.black} />
        </Block>
      ) : (
        <FlatList
          data={riders}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          ItemSeparatorComponent={() => <Block style={{ marginTop: 2 }} />}
          ListHeaderComponent={() => <WalletBalance />}
          ListEmptyComponent={() => <Empty title="No data" />}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.black]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={(post) => (
            <Item
              fullName={post.item.fullName}
              walletBalance={post.item.walletBalance}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
