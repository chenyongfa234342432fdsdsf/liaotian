// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "proto/FriendDestroy.proto" (syntax proto3)
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
 * @generated from protobuf message FriendDestroy
 */
export interface FriendDestroy {
    /**
     * 注销用户ID
     *
     * @generated from protobuf field: sint64 uid = 1;
     */
    uid: string;
    /**
     * 注销用户昵称
     *
     * @generated from protobuf field: string nickName = 2;
     */
    nickName: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class FriendDestroy$Type extends MessageType<FriendDestroy> {
    constructor() {
        super("FriendDestroy", [
            { no: 1, name: "uid", kind: "scalar", T: 18 /*ScalarType.SINT64*/ },
            { no: 2, name: "nickName", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<FriendDestroy>): FriendDestroy {
        const message = { uid: "0", nickName: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<FriendDestroy>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FriendDestroy): FriendDestroy {
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
    internalBinaryWrite(message: FriendDestroy, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* sint64 uid = 1; */
        if (message.uid !== "0")
            writer.tag(1, WireType.Varint).sint64(message.uid);
        /* string nickName = 2; */
        if (message.nickName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.nickName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FriendDestroy
 */
export const FriendDestroy = new FriendDestroy$Type();