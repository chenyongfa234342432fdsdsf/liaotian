// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "proto/UserInfoModify.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message UserInfoModify
 */
export interface UserInfoModify {
    /**
     * 用户UID
     *
     * @generated from protobuf field: sint64 uid = 1;
     */
    uid: string;
    /**
     * 用户昵称
     *
     * @generated from protobuf field: string nickName = 2;
     */
    nickName: string;
    /**
     * 用户头像
     *
     * @generated from protobuf field: string avatarPath = 3;
     */
    avatarPath: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class UserInfoModify$Type extends MessageType<UserInfoModify> {
    constructor() {
        super("UserInfoModify", [
            { no: 1, name: "uid", kind: "scalar", T: 18 /*ScalarType.SINT64*/ },
            { no: 2, name: "nickName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "avatarPath", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UserInfoModify>): UserInfoModify {
        const message = { uid: "0", nickName: "", avatarPath: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<UserInfoModify>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserInfoModify): UserInfoModify {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* sint64 uid */ 1:
                    message.uid = reader.sint64().toString();
                    break;
                case /* string nickName */ 2:
                    message.nickName = reader.string();
                    break;
                case /* string avatarPath */ 3:
                    message.avatarPath = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UserInfoModify, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* sint64 uid = 1; */
        if (message.uid !== "0")
            writer.tag(1, WireType.Varint).sint64(message.uid);
        /* string nickName = 2; */
        if (message.nickName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.nickName);
        /* string avatarPath = 3; */
        if (message.avatarPath !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.avatarPath);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UserInfoModify
 */
export const UserInfoModify = new UserInfoModify$Type();
