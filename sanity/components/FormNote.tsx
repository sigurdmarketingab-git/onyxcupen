import { Card, Stack, Text } from "@sanity/ui";

export function FormNote({ text }: { text: string }) {
  return (
    <Card padding={4} radius={2} tone="caution" border>
      <Stack space={2}>
        <Text size={1} weight="semibold">
          Om den här sidan
        </Text>
        <Text size={1} muted>
          {text}
        </Text>
      </Stack>
    </Card>
  );
}
