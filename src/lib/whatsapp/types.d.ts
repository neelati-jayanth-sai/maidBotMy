// File: types.ts

interface Sender {
  name: string;
  phoneNumber: string;
}

interface Profile {
  name: string;
}

interface Contact {
  profile: Profile;
  wa_id: string; // Assuming wa_id is the phone number
}

interface Metadata {
  display_phone_number: string;
  phone_number_id: string;
}

interface TextMessage {
  from: Sender;
  id: string;
  timestamp: string; // Assuming timestamp is a string, adjust type as needed
  text: {
    body: string;
  };
  type: "text";
}

interface ReactionMessage {
  from: Sender;
  id: string;
  timestamp: string;
  reaction: {
    message_id: string;
    emoji: string;
  };
  type: "reaction";
}

interface MediaMessage {
  from: Sender;
  id: string;
  timestamp: string;
  media: {
    media_url: string; // URL to the media file
    mime_type: string; // MIME type of the media file
    file_sha256: string; // SHA-256 hash of the media file
    file_length: number; // File size in bytes
    caption: string; // Optional caption text
  };
  type: "media";
}

interface UnknownMessage {
  from: Sender;
  id: string;
  timestamp: string;
  type: "unknown";
}

interface WhatsAppMessagePayload {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: Metadata;
        contacts: Contact[];
        messages: (
          | TextMessage
          | ReactionMessage
          | MediaMessage
          | UnknownMessage
          | LocationMessage
          | ReplyButtonMessage
          | ListMessageReply
          | QuickReplyButtonMessage
        )[];
      };
      field: string;
    }>;
  }>;
}
interface Location {
  latitude: number;
  longitude: number;
  name?: string; // Optional name or label for the location
  address?: string; // Optional address for the location
}

interface LocationMessage {
  from: Sender;
  id: string;
  timestamp: string;
  location: Location;
  type: "location";
}

export interface QuickReplyButtonMessage {
  from: Sender;
  id: string;
  timestamp: number;
  type: "button";
  button: {
    text: string;
    payload: string;
  };
}

export interface ListMessageReply {
  from: Sender;
  id: string;
  timestamp: number;
  type: "interactive";
  interactive: {
    type: "list_reply";
    list_reply: {
      id: string;
      title: string;
      description: string;
    };
  };
}

export interface ReplyButtonMessage {
  from: Sender;
  id: string;
  timestamp: number;
  type: "interactive";
  interactive: {
    type: "button_reply";
    button_reply: {
      id: string;
      title: string;
    };
  };
}
export {
  Sender,
  Profile,
  Contact,
  Metadata,
  TextMessage,
  ReactionMessage,
  MediaMessage,
  UnknownMessage,
  WhatsAppMessagePayload,
  Location,
  LocationMessage,
};
