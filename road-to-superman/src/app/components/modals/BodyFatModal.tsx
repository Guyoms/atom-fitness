"use client";
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface BodyFatModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BodyFatModal({ isOpen, onOpenChange }: BodyFatModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Suivi de la Masse Grasse</ModalHeader>
        <ModalBody>
          {/* Formulaire de saisie et historique */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 