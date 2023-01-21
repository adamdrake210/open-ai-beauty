import React, { useEffect, useState } from "react";
import { Button, Dialog, Flex, Text, Title } from "@mantine/core";
import {
  readStorageCookieConsentTimestamp,
  writeStorageCookieConsentTimestamp,
} from "@/utils/cookies";
import { COOKIE_CONSENT_EXPIRY } from "@/constants/constants";

export const CookieConsentBanner = () => {
  const [opened, setOpened] = useState(false);

  const handleCookieConsent = () => {
    writeStorageCookieConsentTimestamp(Date.now());
    setOpened(false);
  };

  useEffect(() => {
    const cookieConsentTimestamp = readStorageCookieConsentTimestamp();
    const yearAgoFromNow = Date.now() - COOKIE_CONSENT_EXPIRY;
    if (!cookieConsentTimestamp || cookieConsentTimestamp < yearAgoFromNow) {
      setOpened(true);
    }
  }, []);

  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={() => setOpened(false)}
      size="md"
      radius="md"
      transition="slide-up"
      transitionDuration={300}
      transitionTimingFunction="ease"
    >
      <Title order={4}>Cookie Consent</Title>
      <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
        When you browse our website, we collect and process your personal data.
        You can learn more about why and how we process your personal data in
        our privacy policy. To collect your personal data, we use cookies. See
        our cookie policy for more details. By using our site, you acknowledge
        that you have read and understood these.
      </Text>
      <Flex justify="flex-end">
        <Button size="sm" uppercase onClick={handleCookieConsent}>
          I Understand
        </Button>
      </Flex>
    </Dialog>
  );
};
