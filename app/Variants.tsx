import React from 'react';
import { View } from 'react-native';
import { Txt } from '~/components/ui/txt';
import { Text } from '~/components/ui/text';
import { Btn } from '~/components/ui/btn';
import { ScrollView } from 'react-native';
import { cardCva } from '~/components/ui/CardCva';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '~/components/ui/card';
import { Badge } from '~/components/ui/BadgeCva';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabsListCva';

const Variants = () => {
  return (
    <ScrollView>
    <View style={{ padding: 20 }}>
        <View>
            <Text>Text Variants</Text>
      <Txt variant="primary" size="lg" weight="bold" color="red">
        Primary Bold Large Red Text
      </Txt>
      <Txt variant="secondary" size="md" weight="normal" color="blue">
        Secondary Normal Medium Blue Text
      </Txt>
      <Txt variant="muted" size="sm" weight="light" color="green">
        Muted Light Small Green Text
      </Txt>
      <Txt variant="destructive" size="xl" weight="extrabold" color="yellow">
        Destructive Extra Bold Extra Large Yellow Text
      </Txt>
      </View>

<View>
    <Text>Button Variamts</Text>
    
    <View style={{ padding: 20, gap: 10 }}>
      <Btn variant="default" size="md" rounded="md" onPress={() => Alert.alert('Default Button')}>
      <Text>Button</Text>
      </Btn>
      <Btn variant="destructive" size="lg" rounded="full" onPress={() => Alert.alert('Destructive Button')}>
      <Text>Button</Text>
      </Btn>
      <Btn variant="outline" size="sm" rounded="sm" onPress={() => Alert.alert('Outline Button')}>
      <Text>Button</Text>
      </Btn>
      <Btn variant="ghost" size="xl" rounded="none" onPress={() => Alert.alert('Ghost Button')}>
      <Text>Button</Text>
      </Btn>
      <Btn variant="link" size="md" rounded="md" onPress={() => Alert.alert('Link Button')}>
      <Text>Button</Text>
      </Btn>
    </View>
    </View>

    <View>
        <Text>Card Variants</Text>
    </View>
    <Card variant="default" size="md" rounded="md" color="default" style={{ margin: 20 }}>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>This is a default card.</CardDescription>
        </CardHeader>
      </Card>

      {/* Elevated Card with Primary Color */}
      <Card variant="elevated" size="lg" rounded="lg" color="primary" style={{ margin: 20 }}>
        <CardHeader>
          <CardTitle>Primary Elevated Card</CardTitle>
          <CardDescription>This card has a primary color and elevated shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>Additional content can go here.</CardDescription>
        </CardContent>
        <CardFooter>
          <CardDescription>Footer Content</CardDescription>
        </CardFooter>
      </Card>

      {/* Outline Card with Rounded Corners */}
      <Card variant="outline" size="sm" rounded="full" color="secondary" style={{ margin: 20 }}>
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>Outline variant with rounded corners.</CardDescription>
        </CardHeader>
      </Card>
    </View>

    <View>
    <Text>Badge</Text>

        <React.Fragment>
      {/* Default Badge */}
      <Badge variant="default">
      <Text>hello</Text>

        </Badge>

      {/* Primary Badge */}
      <Badge variant="primary" size="lg">

      <Text>hello</Text>
      </Badge>

      {/* Success Badge */}
      <Badge variant="success" size="md">
      <Text>hello</Text>

      </Badge>

      {/* Danger Badge with Rounded Corners */}
      <Badge variant="danger" size="sm" rounded="lg">
      <Text>hello</Text>

      </Badge>

      {/* Warning Badge Fully Rounded */}
      <Badge variant="warning" size="lg" rounded="full">
      <Text>hello</Text>

      </Badge>
    </React.Fragment>
    
    </View>

    <View>
        <Text> Tab Variants</Text>

        <View className="p-5">
      {/* Variant 1: Default Tabs with Underline */}
      <Tabs defaultValue="tab1">
        <Text className="text-lg font-bold mb-3">Variant 1: Underline Style</Text>
        <TabsList variant="underline" size="md" className="mb-4">
          <TabsTrigger
            variant="underline"
            size="md"
            color="primary"
            value="tab1"
            className="text-primary border-primary"
          >
            Tab 1
          </TabsTrigger>
          <TabsTrigger
            variant="underline"
            size="md"
            color="secondary"
            value="tab2"
            className="text-secondary border-secondary"
          >
            Tab 2
          </TabsTrigger>
          <TabsTrigger
            variant="underline"
            size="md"
            color="danger"
            value="tab3"
            className="text-red-500 border-red-500"
          >
            Tab 3
          </TabsTrigger>
        </TabsList>

        <TabsContent size="md" color="primary" value="tab1">
          <Text className="text-base text-gray-700">
            This is content for{' '}
            <Text className="font-bold text-blue-500">Tab 1</Text> in the underline variant.
          </Text>
        </TabsContent>
        <TabsContent size="md" color="secondary" value="tab2">
          <Text className="text-base text-gray-700">
            This is content for{' '}
            <Text className="font-bold text-gray-500">Tab 2</Text> in the underline variant.
          </Text>
        </TabsContent>
        <TabsContent size="md" color="danger" value="tab3">
          <Text className="text-base text-gray-700">
            This is content for{' '}
            <Text className="font-bold text-red-500">Tab 3</Text> in the underline variant.
          </Text>
        </TabsContent>
      </Tabs>

      <View className="h-1 bg-gray-300 my-10" />

      {/* Variant 2: Pill Style Tabs */}
      <Tabs defaultValue="tab1">
        <Text className="text-lg font-bold mb-3">Variant 2: Pill Style</Text>
        <TabsList variant="rounded" size="lg" className="mb-4">
          <TabsTrigger
            variant="pill"
            size="lg"
            color="success"
            value="tab1"
            className="text-green-500 bg-green-100 rounded-full"
          >
            Success
          </TabsTrigger>
          <TabsTrigger
            variant="pill"
            size="lg"
            color="warning"
            value="tab2"
            className="text-yellow-500 bg-yellow-100 rounded-full"
          >
            Warning
          </TabsTrigger>
          <TabsTrigger
            variant="pill"
            size="lg"
            color="danger"
            value="tab3"
            className="text-red-500 bg-red-100 rounded-full"
          >
            Danger
          </TabsTrigger>
        </TabsList>

        <TabsContent size="lg" color="success" value="tab1">
          <Text className="text-base text-green-700">
            This is content for{' '}
            <Text className="font-bold text-green-500">Tab 1</Text> in the pill variant.
          </Text>
        </TabsContent>
        <TabsContent size="lg" color="warning" value="tab2">
          <Text className="text-base text-yellow-700">
            This is content for{' '}
            <Text className="font-bold text-yellow-500">Tab 2</Text> in the pill variant.
          </Text>
        </TabsContent>
        <TabsContent size="lg" color="danger" value="tab3">
          <Text className="text-base text-red-700">
            This is content for{' '}
            <Text className="font-bold text-red-500">Tab 3</Text> in the pill variant.
          </Text>
        </TabsContent>
      </Tabs>
    </View>
    </View>
    </ScrollView>
  );
};

export default Variants;
