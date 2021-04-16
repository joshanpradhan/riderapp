import React, { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import * as theme from "../../constants/theme.js";
import { Block, Empty, Card } from "../../components/Index.js";
import { privacyPolicyUrl } from "../../constants/url.js";
import axios from "axios";

export default FAQ = () => {
  const [loading, setLoading] = useState(true);
  const [privacyData, setPrivacyData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source()
    const getPrivacyData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: privacyPolicyUrl,
        });
        setPrivacyData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getPrivacyData()
    return () => {
        source.cancel()
    }
}, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Block center middle>
          <ActivityIndicator size="large" color={theme.colors.maroon} />
        </Block>
      ) : (
        <FlatList
          data={privacyData}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Empty title="privacy policy" />}
          ItemSeparatorComponent={() => {
            return (
              <Block
                style={{ borderWidth: 0.5, borderColor: theme.colors.gray }}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={(post) => (
            <Card title={post.item.title} description={post.item.description} color="#008F7A" />
          )}
        />
      )}
    </SafeAreaView>
  );
};
